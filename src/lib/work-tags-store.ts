import workTagsData from "../../data/work-tags.json" with { type: "json" };

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
};

type Store = {
  generated_at: string | null;
  items: Record<string, Omit<TaggedWork, "productid">>;
};

const store = workTagsData as Store;

export function getTagsForWork(productid: string): string[] {
  return store.items[productid]?.tags ?? [];
}

export function getWorksByTag(slug: string): TaggedWork[] {
  return Object.entries(store.items)
    .filter(([, v]) => v.tags.includes(slug))
    .map(([productid, v]) => ({ productid, ...v }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllTaggedWorks(): TaggedWork[] {
  return Object.entries(store.items).map(([productid, v]) => ({ productid, ...v }));
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
 * 指定 productid と最もタグが重なる作品を返す
 */
export function getRelatedWorks(productid: string, limit = 6): TaggedWork[] {
  const source = store.items[productid];
  if (!source || source.tags.length === 0) return [];
  const sourceTags = new Set(source.tags);

  return Object.entries(store.items)
    .filter(([id]) => id !== productid)
    .map(([id, v]) => {
      const overlap = v.tags.filter((t) => sourceTags.has(t)).length;
      return { productid: id, overlap, ...v };
    })
    .filter((w) => w.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || b.date.localeCompare(a.date))
    .slice(0, limit)
    .map(({ overlap: _overlap, ...w }) => w);
}
