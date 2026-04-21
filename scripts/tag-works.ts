import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { DugaItem, DugaSearchResponse } from "../src/lib/types.ts";
import { tagItem } from "../src/lib/tagger/index.ts";
import { getReleaseDate } from "../src/lib/duga.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../data/work-tags.json");
const API_BASE = "http://affapi.duga.jp/search";

type StoreEntry = {
  tags: string[];
  date: string;
  /** API の完全な DugaItem。Cloudflare Workers は HTTP fetch が不安定なので静的に埋め込む */
  item: DugaItem;
};

type WorkTags = {
  generated_at: string;
  items: Record<string, StoreEntry>;
};

async function fetchPage(offset: number, hits: number): Promise<DugaItem[]> {
  const appid = process.env.DUGA_APPID;
  const agentid = process.env.DUGA_AGENTID;
  const bannerid = process.env.DUGA_BANNERID ?? "01";
  if (!appid || !agentid) {
    throw new Error("DUGA_APPID / DUGA_AGENTID が未設定です");
  }
  const params = new URLSearchParams({
    version: "1.2",
    appid,
    agentid,
    bannerid,
    format: "json",
    adult: "1",
    category: "01",
    sort: "new",
    hits: String(hits),
    offset: String(offset),
  });
  const res = await fetch(`${API_BASE}?${params}`);
  if (!res.ok) throw new Error(`DUGA API ${res.status}: ${res.statusText}`);
  const json = (await res.json()) as DugaSearchResponse;
  return (json.items ?? []).map((w) => w.item);
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** 1回のバッチで取得する件数（新しい順） */
const FETCH_PER_RUN = Number(process.env.TAG_TARGET_COUNT ?? 500);
/** 累積保持件数の上限 (超えたら発売日が古い順に削除) */
const MAX_STORED = Number(process.env.MAX_STORED_COUNT ?? 1500);

async function loadExisting(): Promise<WorkTags> {
  try {
    const text = await readFile(OUT_PATH, "utf-8");
    const parsed = JSON.parse(text) as Partial<WorkTags>;
    if (parsed.items && typeof parsed.items === "object") {
      return {
        generated_at: parsed.generated_at ?? null,
        items: parsed.items as WorkTags["items"],
      } as WorkTags;
    }
  } catch {
    /* ファイル無し or パースエラー → 空で開始 */
  }
  return { generated_at: "", items: {} };
}

async function main() {
  const perPage = 50;
  const fetched: DugaItem[] = [];
  for (let offset = 1; fetched.length < FETCH_PER_RUN; offset += perPage) {
    console.log(`fetching offset=${offset}...`);
    const page = await fetchPage(offset, perPage);
    if (page.length === 0) break;
    fetched.push(...page);
    if (page.length < perPage) break;
    await sleep(1200);
  }
  console.log(`fetched ${fetched.length} works`);

  // 既存データを読み込んでマージ
  const existing = await loadExisting();
  const existingCount = Object.keys(existing.items).length;
  console.log(`existing entries: ${existingCount}`);

  const out: WorkTags = {
    generated_at: new Date().toISOString(),
    items: { ...existing.items }, // 既存を継承
  };

  let newCount = 0;
  let updatedCount = 0;
  const tagCounts = new Map<string, number>();
  for (const item of fetched) {
    const tags = tagItem(item);
    const isNew = !(item.productid in out.items);
    if (isNew) newCount++;
    else updatedCount++;
    for (const t of tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    out.items[item.productid] = {
      tags,
      date: getReleaseDate(item),
      item,
    };
  }

  // 上限超過なら発売日が古い順に削除 (直近の作品を優先保持)
  const totalBeforeTrim = Object.keys(out.items).length;
  if (totalBeforeTrim > MAX_STORED) {
    const sortedByDate = Object.entries(out.items).sort(
      ([, a], [, b]) => b.date.localeCompare(a.date),
    );
    const kept = sortedByDate.slice(0, MAX_STORED);
    out.items = Object.fromEntries(kept);
    console.log(`trimmed: ${totalBeforeTrim} -> ${MAX_STORED} (removed ${totalBeforeTrim - MAX_STORED} old items)`);
  }

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(out, null, 2), "utf-8");

  const finalTotal = Object.keys(out.items).length;
  let taggedCount = 0;
  for (const entry of Object.values(out.items)) {
    if (entry.tags.length > 0) taggedCount++;
  }

  console.log(`\n=== 結果 ===`);
  console.log(`今回取得: ${fetched.length} 件 (新規 ${newCount} / 更新 ${updatedCount})`);
  console.log(`累積保存数: ${finalTotal} 件 (上限 ${MAX_STORED})`);
  console.log(`タグ付与済み: ${taggedCount} (${((taggedCount / finalTotal) * 100).toFixed(1)}%)`);
  console.log(`\n今回取得分の人気タグ TOP20:`);
  [...tagCounts.entries()]
    .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
    .slice(0, 20)
    .forEach(([tag, count]) => console.log(`  ${tag}: ${count}`));
  console.log(`\n出力先: ${OUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
