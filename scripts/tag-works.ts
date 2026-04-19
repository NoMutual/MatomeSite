import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { DmmItem, DmmItemListResponse } from "../src/lib/types.ts";
import { tagItem } from "../src/lib/tagger/index.ts";
import { getThumbnail } from "../src/lib/dmm.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../data/work-tags.json");
const API_BASE = "https://api.dmm.com/affiliate/v3/ItemList";

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
      actress?: string[];
    }
  >;
};

async function fetchPage(offset: number, hits: number): Promise<DmmItem[]> {
  const api_id = process.env.DMM_API_ID;
  const affiliate_id = process.env.DMM_AFFILIATE_ID;
  if (!api_id || !affiliate_id) {
    throw new Error("DMM_API_ID / DMM_AFFILIATE_ID が未設定です");
  }
  const params = new URLSearchParams({
    api_id,
    affiliate_id,
    site: "FANZA",
    service: "digital",
    floor: "videoc",
    output: "json",
    sort: "date",
    hits: String(hits),
    offset: String(offset),
  });
  const res = await fetch(`${API_BASE}?${params}`);
  if (!res.ok) throw new Error(`DMM API ${res.status}: ${res.statusText}`);
  const json = (await res.json()) as DmmItemListResponse;
  return json.result.items;
}

async function main() {
  const target = Number(process.env.TAG_TARGET_COUNT ?? 200);
  const perPage = 100;
  const all: DmmItem[] = [];
  for (let offset = 1; all.length < target; offset += perPage) {
    console.log(`fetching offset=${offset}...`);
    const page = await fetchPage(offset, perPage);
    if (page.length === 0) break;
    all.push(...page);
    if (page.length < perPage) break;
  }
  console.log(`fetched ${all.length} works`);

  const out: WorkTags = { generated_at: new Date().toISOString(), items: {} };
  let zeroCount = 0;
  const tagCounts = new Map<string, number>();
  for (const item of all) {
    const tags = tagItem(item);
    if (tags.length === 0) zeroCount++;
    for (const t of tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    out.items[item.content_id] = {
      tags,
      title: item.title,
      date: item.date?.slice(0, 10) ?? "",
      thumbnail: getThumbnail(item),
      affiliateURL: item.affiliateURL || item.URL,
      price: item.prices?.price,
      review: item.review
        ? { average: item.review.average, count: item.review.count }
        : undefined,
      actress: item.iteminfo?.actress?.map((a) => a.name),
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
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .forEach(([tag, count]) => console.log(`  ${tag}: ${count}`));
  console.log(`\n出力先: ${OUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
