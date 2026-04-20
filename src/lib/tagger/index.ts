import type { DmmItem, Tag } from "../types";
import { TAG_BY_SLUG } from "../tags";
import { COMMENT_PATTERNS, GENRE_TO_TAGS, LABEL_HINT_TAGS } from "./rules";

/**
 * 作品情報から独自タグを推定する
 * @returns 重複除去済みのタグ slug 配列
 */
export function tagItem(item: DmmItem): Tag["slug"][] {
  const tags = new Set<Tag["slug"]>();

  // 1. 公式ジャンル → 独自タグ
  for (const g of item.iteminfo?.genre ?? []) {
    const mapped = GENRE_TO_TAGS[g.name];
    if (mapped) for (const t of mapped) tags.add(t);
  }

  // 2. レーベル / メーカー名のヒント
  const brand = [
    ...(item.iteminfo?.label ?? []).map((l) => l.name),
    ...(item.iteminfo?.maker ?? []).map((m) => m.name),
  ].join(" ");
  for (const rule of LABEL_HINT_TAGS) {
    if (rule.pattern.test(brand)) for (const t of rule.tags) tags.add(t);
  }

  // 3. comment のキーワードマッチ
  const text = item.comment ?? "";
  for (const rule of COMMENT_PATTERNS) {
    if (rule.pattern.test(text)) for (const t of rule.tags) tags.add(t);
  }

  // 存在しない slug は除外（安全ガード）
  return Array.from(tags).filter((slug) => TAG_BY_SLUG.has(slug));
}
