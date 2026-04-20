import sampleData from "../../data/sample-works.json";
import type { DmmItem } from "./types";

type SampleStore = {
  items: DmmItem[];
};

const store = sampleData as unknown as SampleStore;

/**
 * APIが使えない時のフォールバックデータ。
 * data/sample-works.json に手動でDUGA公開情報を投入する前提。
 */
export function getSampleItems(): DmmItem[] {
  return store.items ?? [];
}

export function findSampleItem(cid: string): DmmItem | undefined {
  return store.items?.find((i) => i.content_id === cid);
}
