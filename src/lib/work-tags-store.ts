import workTagsData from "../../data/work-tags.json" with { type: "json" };
import type { DugaItem } from "./types.ts";
import {
  getAffiliateLink,
  getReleaseDate,
  getReviewScore,
  getSampleMovieUrl,
  getThumbnail,
} from "./duga.ts";

type StoreEntry = {
  tags: string[];
  date: string;
  item: DugaItem;
};

type Store = {
  generated_at: string | null;
  items: Record<string, StoreEntry>;
};

const store = workTagsData as unknown as Store;

/** 表示用に派生した軽量データ型（カード表示で使う） */
export type TaggedWork = {
  productid: string;
  tags: string[];
  title: string;
  date: string;
  thumbnail?: string;
  affiliateURL?: string;
  price?: string;
  review?: { average: string; count: number };
  performer?: string[];
  sampleMovie?: string;
};

function toTagged(productid: string, entry: StoreEntry): TaggedWork {
  const it = entry.item;
  return {
    productid,
    tags: entry.tags,
    title: it.title,
    date: entry.date || getReleaseDate(it),
    thumbnail: getThumbnail(it),
    affiliateURL: getAffiliateLink(it),
    price: it.price,
    review: getReviewScore(it),
    performer: it.performer?.map((p) => p.name).filter(Boolean) as
      | string[]
      | undefined,
    sampleMovie: getSampleMovieUrl(it),
  };
}

export function getTagsForWork(productid: string): string[] {
  return store.items[productid]?.tags ?? [];
}

export function getWorksByTag(slug: string): TaggedWork[] {
  return Object.entries(store.items)
    .filter(([, v]) => v.tags.includes(slug))
    .map(([pid, v]) => toTagged(pid, v))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllTaggedWorks(): TaggedWork[] {
  return Object.entries(store.items).map(([pid, v]) => toTagged(pid, v));
}

/** フル DugaItem を productid で取得。Cloudflare 環境ではこれが唯一のデータソース */
export function getFullItem(productid: string): DugaItem | undefined {
  return store.items[productid]?.item;
}

/** 全ての DugaItem を新着順で返す（一覧表示用） */
export function getAllItems(): DugaItem[] {
  return Object.entries(store.items)
    .map(([, v]) => v)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((v) => v.item);
}

export function getGeneratedAt(): string | null {
  return store.generated_at;
}

export function getTagCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const entry of Object.values(store.items)) {
    for (const tag of entry.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}

/**
 * 実データ上で同時に付与されているタグペアを頻度順で返す
 * (sitemap の組み合わせページ生成に使う)
 */
export function getTagPairCounts(): Array<{
  a: string;
  b: string;
  count: number;
}> {
  const pairs = new Map<string, number>();
  for (const entry of Object.values(store.items)) {
    const sorted = [...entry.tags].sort();
    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        const key = `${sorted[i]}|${sorted[j]}`;
        pairs.set(key, (pairs.get(key) ?? 0) + 1);
      }
    }
  }
  return [...pairs.entries()]
    .map(([key, count]) => {
      const [a, b] = key.split("|");
      return { a, b, count };
    })
    .sort((x, y) => y.count - x.count);
}

export type SearchOptions = {
  tags?: string[];
  keyword?: string;
  sort?: "date" | "rating" | "favorite";
};

/**
 * タグ・キーワードで作品を検索。title と caption 両方を対象。
 */
export function searchWorks(options: SearchOptions = {}): TaggedWork[] {
  const { tags = [], keyword, sort = "date" } = options;
  const kw = keyword?.trim();

  let entries = Object.entries(store.items).filter(([, v]) => {
    if (tags.length > 0 && !tags.every((t) => v.tags.includes(t))) return false;
    if (kw) {
      const inTitle = v.item.title.includes(kw);
      const inCaption = (v.item.caption ?? "").includes(kw);
      const inPerformer = (v.item.performer ?? []).some((p) =>
        p.name?.includes(kw),
      );
      const inMaker = (v.item.makername ?? "").includes(kw);
      if (!inTitle && !inCaption && !inPerformer && !inMaker) return false;
    }
    return true;
  });

  if (sort === "rating") {
    entries.sort(
      ([, a], [, b]) =>
        parseFloat(b.item.review?.[0]?.score ?? "0") -
        parseFloat(a.item.review?.[0]?.score ?? "0"),
    );
  } else if (sort === "favorite") {
    entries.sort(
      ([, a], [, b]) =>
        parseInt(b.item.ranking?.[0]?.total?.replace(/,/g, "") ?? "0") -
        parseInt(a.item.ranking?.[0]?.total?.replace(/,/g, "") ?? "0"),
    );
  } else {
    entries.sort(([, a], [, b]) => b.date.localeCompare(a.date));
  }

  return entries.map(([pid, v]) => toTagged(pid, v));
}

/**
 * 指定 productid と最もタグが重なる作品を返す
 */
export function getRelatedWorks(productid: string, limit = 6): TaggedWork[] {
  const source = store.items[productid];
  if (!source || source.tags.length === 0) return [];
  const sourceTags = new Set(source.tags);

  return Object.entries(store.items)
    .filter(([id]) => id !== productid)
    .map(([pid, v]) => ({
      pid,
      v,
      overlap: v.tags.filter((t) => sourceTags.has(t)).length,
    }))
    .filter((r) => r.overlap > 0)
    .sort(
      (a, b) => b.overlap - a.overlap || b.v.date.localeCompare(a.v.date),
    )
    .slice(0, limit)
    .map((r) => toTagged(r.pid, r.v));
}
