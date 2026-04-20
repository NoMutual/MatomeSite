import type { Tag } from "../types.ts";

/**
 * DUGA カテゴリID → 極みタグ slug のマッピング
 * item.category[].data.id との完全一致で判定
 */
export const DUGA_CATEGORY_TO_TAGS: Record<string, Tag["slug"][]> = {
  // 01=素人 はメインフロアなのでタグ付けしない
  "0101": ["hitozuma"], // 妊婦 → 人妻系の便宜上
  "03": ["gachi"], // 盗撮 → ガチ感
  "07": ["jukujo"], // 熟女
  "09": ["joshidai"], // 女子大生/女子高生
  "10": [], // コスプレ（極みタグに無いので空）
  "21": [], // オナニー（極みタグに無いので空）
  "23": ["monitor"], // 企画 → モニター企画
  // 100番台の属性タグ
  "100005": [], // 近親相姦
  "100009": [], // 痴女
  "100010": ["roshutsu"], // 露出
  "100022": ["pocchari"], // ぽっちゃり
  "100025": ["gyaru"], // ギャル
  "100027": [], // 下着
  "100028": [], // 水着
  "100035": ["fukugyou"], // 風俗嬢 → 副業軸
  "100038": ["kyonyu"], // 母乳 → 巨乳
  "100041": ["binyu"], // 貧乳
};

/**
 * DUGA レーベル名 → 極みタグ slug のマッピング
 * 部分一致（レーベル名に含まれていればマッチ）
 */
export const LABEL_HINT_TAGS: Array<{ pattern: RegExp; tags: Tag["slug"][] }> = [
  { pattern: /プレステージ|PRESTIGE/i, tags: ["high-res"] },
  { pattern: /ナンパTV|シロウトTV/i, tags: ["nampa", "doc"] },
  { pattern: /マジックミラー|MM号/, tags: ["nampa", "monitor"] },
  { pattern: /素人.*ナンパ|ナンパ.*素人/, tags: ["nampa"] },
  { pattern: /ドキュメン[トタ]/, tags: ["doc"] },
  { pattern: /個撮|個人撮影/, tags: ["gachi", "pov"] },
  { pattern: /投稿/, tags: ["gachi"] },
  { pattern: /ハメ撮り/, tags: ["pov"] },
];

/**
 * caption (商品説明) へのキーワード正規表現 → 極みタグ slug
 */
export const COMMENT_PATTERNS: Array<{ pattern: RegExp; tags: Tag["slug"][] }> = [
  // 場所
  { pattern: /ラブホ|ラブホテル/, tags: ["lovehotel", "hotel"] },
  { pattern: /ホテル(?!ット)/, tags: ["hotel"] },
  { pattern: /自宅|ご自宅|お部屋|彼女の部屋/, tags: ["home"] },
  { pattern: /野外|屋外|公園/, tags: ["outdoor"] },
  { pattern: /車内|車の中|カーセックス/, tags: ["car"] },
  // 出会い方
  { pattern: /ナンパ/, tags: ["nampa"] },
  { pattern: /マッチングアプリ|マッチング/, tags: ["matching"] },
  { pattern: /相席(屋|ラウンジ)?/, tags: ["aiseki"] },
  { pattern: /パパ活/, tags: ["papakatsu"] },
  { pattern: /SNS(募集|で募集)/, tags: ["sns"] },
  { pattern: /逆ナン(パ)?/, tags: ["gyakunan"] },
  // 初性・動機
  { pattern: /初撮り|初めての撮影/, tags: ["hatsudori"] },
  { pattern: /AVデビュー|AV初出演/, tags: ["debut"] },
  { pattern: /副業|お小遣い稼ぎ/, tags: ["fukugyou"] },
  { pattern: /借金/, tags: ["shakkin"] },
  { pattern: /ノリで|軽いノリ/, tags: ["nori"] },
  { pattern: /露出(好き|願望|癖)/, tags: ["roshutsu"] },
  // 属性
  { pattern: /女子大生|JD|大学生/, tags: ["joshidai"] },
  { pattern: /OL|オフィスレディ|会社員/, tags: ["ol"] },
  { pattern: /人妻|若妻|奥様|奥さん/, tags: ["hitozuma"] },
  { pattern: /熟女|熟妻/, tags: ["jukujo"] },
  { pattern: /上京/, tags: ["joukyou"] },
  { pattern: /地方|田舎/, tags: ["chihou"] },
  // ルックス
  { pattern: /清楚(系|な|そう)/, tags: ["seiso"] },
  { pattern: /ギャル(系)?/, tags: ["gyaru"] },
  { pattern: /美人(系|な)|美女/, tags: ["bijin"] },
  { pattern: /素朴(系|な)/, tags: ["soboku"] },
  { pattern: /童顔/, tags: ["dougan"] },
  { pattern: /地味(系|め)/, tags: ["jimi"] },
  { pattern: /ハーフ/, tags: ["half"] },
  { pattern: /モデル(体型|系|のよう)/, tags: ["model"] },
  // 体型
  { pattern: /スレンダー|細身/, tags: ["slender"] },
  { pattern: /巨乳/, tags: ["kyonyu"] },
  { pattern: /爆乳/, tags: ["bakunyu"] },
  { pattern: /微乳|貧乳/, tags: ["binyu"] },
  { pattern: /ぽっちゃり|むっちり/, tags: ["pocchari"] },
  { pattern: /色白|雪肌|透き通る/, tags: ["shiroi"] },
  { pattern: /日焼け|褐色/, tags: ["hiyake"] },
  // 雰囲気
  { pattern: /おとなしい|大人しい|内気/, tags: ["otonashii"] },
  { pattern: /積極的(に|な)|ガツガツ/, tags: ["sekkyokuteki"] },
  { pattern: /真面目(な|そう)/, tags: ["majime"] },
  { pattern: /天然(系|な)/, tags: ["tennen"] },
  { pattern: /ドS/, tags: ["do-s"] },
  { pattern: /ドM/, tags: ["do-m"] },
  // 撮影スタイル
  { pattern: /ハメ撮り/, tags: ["pov"] },
  { pattern: /固定カメラ/, tags: ["fixed"] },
  { pattern: /マルチアングル|多視点/, tags: ["multi"] },
  { pattern: /スマホ撮影|iPhone撮影/, tags: ["smartphone"] },
  { pattern: /縦画面|縦撮り/, tags: ["tategami"] },
  { pattern: /ドキュメン[トタ]/, tags: ["doc"] },
  { pattern: /ガチ(素人|の素人|ンコ)|個撮|個人撮影|投稿/, tags: ["gachi"] },
];
