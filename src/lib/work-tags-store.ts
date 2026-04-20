import workTagsData from "../../data/work-tags.json";

export type TaggedWork = {
  cid: string;
  tags: string[];
  title: string;
  date: string;
  thumbnail?: string;
  affiliateURL?: string;
  price?: string;
  review?: { average: string; count: number };
  actress?: string[];
};

type Store = {
  generated_at: string | null;
  items: Record<string, Omit<TaggedWork, "cid">>;
};

const store = workTagsData as Store;

export function getTagsForWork(cid: string): string[] {
  return store.items[cid]?.tags ?? [];
}

export function getWorksByTag(slug: string): TaggedWork[] {
  return Object.entries(store.items)
    .filter(([, v]) => v.tags.includes(slug))
    .map(([cid, v]) => ({ cid, ...v }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllTaggedWorks(): TaggedWork[] {
  return Object.entries(store.items).map(([cid, v]) => ({ cid, ...v }));
}

export function getGeneratedAt(): string | null {
  return store.generated_at;
}

export function getTagCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of Object.values(store.items)) {
    for (const tag of item.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}

/**
 * 指定 cid と最もタグが重なる作品を返す
 */
export function getRelatedWorks(cid: string, limit = 6): TaggedWork[] {
  const source = store.items[cid];
  if (!source || source.tags.length === 0) return [];
  const sourceTags = new Set(source.tags);

  return Object.entries(store.items)
    .filter(([id]) => id !== cid)
    .map(([id, v]) => {
      const overlap = v.tags.filter((t) => sourceTags.has(t)).length;
      return { cid: id, overlap, ...v };
    })
    .filter((w) => w.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || b.date.localeCompare(a.date))
    .slice(0, limit)
    .map(({ overlap: _overlap, ...w }) => w);
}
