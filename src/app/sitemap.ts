import type { MetadataRoute } from "next";
import { TAGS, TAG_CATEGORY_LABEL } from "@/lib/tags";
import {
  getAllTaggedWorks,
  getTagCounts,
  getTagPairCounts,
} from "@/lib/work-tags-store";
import type { TagCategory } from "@/lib/types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://shirouto-kiwami.com";

/** SEO上うちのサイトで重要な検索キーワード（パス型で個別ページ生成される） */
const SEARCH_KEYWORDS = [
  "ナンパ",
  "マッチングアプリ",
  "初撮り",
  "ハメ撮り",
  "人妻",
  "女子大生",
  "熟女",
  "ギャル",
  "巨乳",
  "スレンダー",
];

/** 実データ上で組み合わせが存在するタグペアのうち、最低この件数以上あるものだけ sitemap に含める */
const MIN_PAIR_COUNT = 2;
/** sitemap に含めるタグペアの上限 (多すぎる sitemap を防ぐ) */
const MAX_PAIR_COUNT = 100;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/works`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/tags`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/guides/how-to-choose-amateur`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/about/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/about/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/about/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryPages: MetadataRoute.Sitemap = (
    Object.keys(TAG_CATEGORY_LABEL) as TagCategory[]
  ).map((cat) => ({
    url: `${SITE_URL}/tags/${cat}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const tagCounts = getTagCounts();
  const tagPages: MetadataRoute.Sitemap = TAGS.map((tag) => ({
    url: `${SITE_URL}/tags/${tag.category}/${tag.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: (tagCounts.get(tag.slug) ?? 0) > 0 ? 0.75 : 0.5,
  }));

  const workPages: MetadataRoute.Sitemap = getAllTaggedWorks().map((w) => ({
    url: `${SITE_URL}/works/${w.productid}`,
    lastModified: w.date ? new Date(w.date) : now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const searchPages: MetadataRoute.Sitemap = SEARCH_KEYWORDS.map((kw) => ({
    url: `${SITE_URL}/search/${encodeURIComponent(kw)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const comboPages: MetadataRoute.Sitemap = getTagPairCounts()
    .filter((p) => p.count >= MIN_PAIR_COUNT)
    .slice(0, MAX_PAIR_COUNT)
    .map(({ a, b, count }) => ({
      url: `${SITE_URL}/combo/${a}-${b}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: count >= 5 ? 0.75 : 0.65,
    }));

  return [
    ...staticPages,
    ...categoryPages,
    ...tagPages,
    ...workPages,
    ...searchPages,
    ...comboPages,
  ];
}
