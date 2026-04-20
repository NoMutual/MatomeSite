import type { Tag, TagCategory } from "./types.ts";

export const TAG_CATEGORY_LABEL: Record<TagCategory, string> = {
  girl_type: "女の子のタイプ",
  situation: "出会い方・関係性",
  shooting_style: "撮影スタイル",
  place_mood: "場所・ムード",
};

export const TAGS: Tag[] = [
  // girl_type - ルックス
  { slug: "seiso", label: "清楚系", category: "girl_type", subcategory: "looks" },
  { slug: "gyaru", label: "ギャル", category: "girl_type", subcategory: "looks" },
  { slug: "bijin", label: "美人系", category: "girl_type", subcategory: "looks" },
  { slug: "soboku", label: "素朴系", category: "girl_type", subcategory: "looks" },
  { slug: "dougan", label: "童顔", category: "girl_type", subcategory: "looks" },
  { slug: "jimi", label: "地味系", category: "girl_type", subcategory: "looks" },
  { slug: "half", label: "ハーフ顔", category: "girl_type", subcategory: "looks" },
  { slug: "model", label: "モデル系", category: "girl_type", subcategory: "looks" },
  // girl_type - 体型
  { slug: "slender", label: "スレンダー", category: "girl_type", subcategory: "body" },
  { slug: "kyonyu", label: "巨乳", category: "girl_type", subcategory: "body" },
  { slug: "binyu", label: "微乳", category: "girl_type", subcategory: "body" },
  { slug: "bakunyu", label: "爆乳", category: "girl_type", subcategory: "body" },
  { slug: "pocchari", label: "ぽっちゃり", category: "girl_type", subcategory: "body" },
  { slug: "yasegata", label: "痩せ型", category: "girl_type", subcategory: "body" },
  { slug: "shiroi", label: "色白", category: "girl_type", subcategory: "body" },
  { slug: "hiyake", label: "日焼け", category: "girl_type", subcategory: "body" },
  // girl_type - 雰囲気
  { slug: "otonashii", label: "おとなしい", category: "girl_type", subcategory: "mood" },
  { slug: "sekkyokuteki", label: "積極的", category: "girl_type", subcategory: "mood" },
  { slug: "majime", label: "真面目", category: "girl_type", subcategory: "mood" },
  { slug: "tennen", label: "天然", category: "girl_type", subcategory: "mood" },
  { slug: "do-s", label: "ドS", category: "girl_type", subcategory: "mood" },
  { slug: "do-m", label: "ドM", category: "girl_type", subcategory: "mood" },
  // girl_type - 属性
  { slug: "joshidai", label: "女子大生", category: "girl_type", subcategory: "attr" },
  { slug: "ol", label: "OL", category: "girl_type", subcategory: "attr" },
  { slug: "hitozuma", label: "人妻", category: "girl_type", subcategory: "attr" },
  { slug: "jukujo", label: "熟女", category: "girl_type", subcategory: "attr" },
  { slug: "chihou", label: "地方", category: "girl_type", subcategory: "attr" },
  { slug: "joukyou", label: "上京系", category: "girl_type", subcategory: "attr" },

  // situation - 出会い方
  { slug: "nampa", label: "ナンパ", category: "situation", subcategory: "meet" },
  { slug: "matching", label: "マッチングアプリ", category: "situation", subcategory: "meet" },
  { slug: "aiseki", label: "相席", category: "situation", subcategory: "meet" },
  { slug: "sns", label: "SNS募集", category: "situation", subcategory: "meet" },
  { slug: "monitor", label: "モニター企画", category: "situation", subcategory: "meet" },
  { slug: "gyakunan", label: "逆ナン", category: "situation", subcategory: "meet" },
  { slug: "papakatsu", label: "パパ活", category: "situation", subcategory: "meet" },
  // situation - 初性
  { slug: "debut", label: "AVデビュー", category: "situation", subcategory: "experience" },
  { slug: "hatsudori", label: "初撮り", category: "situation", subcategory: "experience" },
  { slug: "nikaime", label: "2回目", category: "situation", subcategory: "experience" },
  { slug: "jouren", label: "常連", category: "situation", subcategory: "experience" },
  // situation - 動機
  { slug: "fukugyou", label: "副業", category: "situation", subcategory: "motive" },
  { slug: "shakkin", label: "借金", category: "situation", subcategory: "motive" },
  { slug: "nori", label: "ノリ", category: "situation", subcategory: "motive" },
  { slug: "roshutsu", label: "露出好き", category: "situation", subcategory: "motive" },
  { slug: "seiyoku", label: "性欲強め", category: "situation", subcategory: "motive" },

  // shooting_style
  { slug: "pov", label: "ハメ撮りPOV", category: "shooting_style" },
  { slug: "fixed", label: "固定カメラ", category: "shooting_style" },
  { slug: "multi", label: "マルチアングル", category: "shooting_style" },
  { slug: "smartphone", label: "スマホ撮影", category: "shooting_style" },
  { slug: "tategami", label: "縦撮り", category: "shooting_style" },
  { slug: "high-res", label: "高画質", category: "shooting_style" },
  { slug: "doc", label: "ドキュメント調", category: "shooting_style" },
  { slug: "enshutsu", label: "演出感強め", category: "shooting_style" },
  { slug: "gachi", label: "ガチ感", category: "shooting_style" },
  { slug: "yarase", label: "やらせ感", category: "shooting_style" },

  // place_mood
  { slug: "hotel", label: "ホテル", category: "place_mood", subcategory: "place" },
  { slug: "home", label: "自宅", category: "place_mood", subcategory: "place" },
  { slug: "lovehotel", label: "ラブホ", category: "place_mood", subcategory: "place" },
  { slug: "outdoor", label: "野外", category: "place_mood", subcategory: "place" },
  { slug: "car", label: "車内", category: "place_mood", subcategory: "place" },
  { slug: "hiru", label: "昼", category: "place_mood", subcategory: "time" },
  { slug: "yoru", label: "夜", category: "place_mood", subcategory: "time" },
  { slug: "akarui", label: "明るい", category: "place_mood", subcategory: "atmosphere" },
  { slug: "kuragame", label: "暗め", category: "place_mood", subcategory: "atmosphere" },
  { slug: "namanamashii", label: "生々しい", category: "place_mood", subcategory: "atmosphere" },
  { slug: "seiketsu", label: "清潔感", category: "place_mood", subcategory: "atmosphere" },
];

export const TAG_BY_SLUG = new Map(TAGS.map((t) => [t.slug, t]));

export function getTagsByCategory(category: TagCategory): Tag[] {
  return TAGS.filter((t) => t.category === category);
}

export function getTagsBySubcategory(category: TagCategory): Map<string, Tag[]> {
  const map = new Map<string, Tag[]>();
  for (const tag of getTagsByCategory(category)) {
    const key = tag.subcategory ?? "default";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(tag);
  }
  return map;
}
