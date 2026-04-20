import type { DugaItem, Tag } from "../types.ts";
import { TAG_BY_SLUG } from "../tags.ts";
import { COMMENT_PATTERNS, DUGA_CATEGORY_TO_TAGS, LABEL_HINT_TAGS } from "./rules.ts";

/**
 * 作品情報から独自タグを推定する
 * @returns 重複除去済みのタグ slug 配列
 */
export function tagItem(item: DugaItem): Tag["slug"][] {
  const tags = new Set<Tag["slug"]>();

  // 1. DUGA カテゴリID → 独自タグ
  for (const c of item.category ?? []) {
    const mapped = DUGA_CATEGORY_TO_TAGS[c.data.id];
    if (mapped) for (const t of mapped) tags.add(t);
  }

  // 2. レーベル / メーカー名のヒント
  const brand = [
    ...(item.label ?? []).map((l) => l.name),
    item.makername ?? "",
  ].join(" ");
  for (const rule of LABEL_HINT_TAGS) {
    if (rule.pattern.test(brand)) for (const t of rule.tags) tags.add(t);
  }

  // 3. caption (商品説明) のキーワードマッチ
  const text = [item.caption ?? "", item.title ?? ""].join(" ");
  for (const rule of COMMENT_PATTERNS) {
    if (rule.pattern.test(text)) for (const t of rule.tags) tags.add(t);
  }

  // 存在しない slug は除外（安全ガード）
  return Array.from(tags).filter((slug) => TAG_BY_SLUG.has(slug));
}
