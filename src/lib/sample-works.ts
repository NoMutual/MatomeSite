import sampleData from "../../data/sample-works.json" with { type: "json" };
import type { DugaItem } from "./types.ts";

type SampleStore = {
  items: DugaItem[];
};

const store = sampleData as unknown as SampleStore;

/**
 * APIが使えない時のフォールバックデータ。
 * data/sample-works.json に手動でDUGA公開情報を投入する前提。
 */
export function getSampleItems(): DugaItem[] {
  return store.items ?? [];
}

export function findSampleItem(productid: string): DugaItem | undefined {
  return store.items?.find((i) => i.productid === productid);
}
