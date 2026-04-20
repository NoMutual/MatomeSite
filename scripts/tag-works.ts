import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { DugaItem, DugaSearchResponse } from "../src/lib/types.ts";
import { tagItem } from "../src/lib/tagger/index.ts";
import {
  getReleaseDate,
  getReviewScore,
  getSampleMovieUrl,
  getThumbnail,
} from "../src/lib/duga.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../data/work-tags.json");
const API_BASE = "http://affapi.duga.jp/search";

type WorkTags = {
  generated_at: string;
  items: Record<
    string,
    {
      tags: string[];
      title: string;
      date: string;
      thumbnail?: string;
      affiliateURL?: string;
      price?: string;
      review?: { average: string; count: number };
      performer?: string[];
      sampleMovie?: string;
    }
  >;
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

/** DUGA API は 60req/60sec 制限なので待機 */
async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const target = Number(process.env.TAG_TARGET_COUNT ?? 100);
  const perPage = 50;
  const all: DugaItem[] = [];
  for (let offset = 1; all.length < target; offset += perPage) {
    console.log(`fetching offset=${offset}...`);
    const page = await fetchPage(offset, perPage);
    if (page.length === 0) break;
    all.push(...page);
    if (page.length < perPage) break;
    await sleep(1200); // レート制限回避
  }
  console.log(`fetched ${all.length} works`);

  const out: WorkTags = { generated_at: new Date().toISOString(), items: {} };
  let zeroCount = 0;
  const tagCounts = new Map<string, number>();
  for (const item of all) {
    const tags = tagItem(item);
    if (tags.length === 0) zeroCount++;
    for (const t of tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    const review = getReviewScore(item);
    out.items[item.productid] = {
      tags,
      title: item.title,
      date: getReleaseDate(item),
      thumbnail: getThumbnail(item),
      affiliateURL: item.affiliateurl || item.url,
      price: item.price,
      review,
      performer: item.performer?.map((p) => p.name).filter(Boolean) as string[] | undefined,
      sampleMovie: getSampleMovieUrl(item),
    };
  }

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(out, null, 2), "utf-8");

  const total = all.length;
  const avg = total === 0 ? 0 : (total - zeroCount) / total;
  console.log(`\n=== 結果 ===`);
  console.log(`総作品数: ${total}`);
  console.log(`タグが1個以上付いた: ${total - zeroCount} (${(avg * 100).toFixed(1)}%)`);
  console.log(`タグゼロ: ${zeroCount}`);
  console.log(`\n人気タグ TOP20:`);
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
