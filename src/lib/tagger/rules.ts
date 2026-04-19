import type { Tag } from "../types";

/**
 * DMM公式ジャンル名 → 独自タグ slug のマッピング
 * ItemList API が返す iteminfo.genre[].name との完全一致で判定
 */
export const GENRE_TO_TAGS: Record<string, Tag["slug"][]> = {
  // situation - 出会い方
  ナンパ: ["nampa"],
  素人ナンパ: ["nampa"],
  マッチングアプリ: ["matching"],
  モニター企画: ["monitor"],
  モニタリング: ["monitor"],
  パパ活: ["papakatsu"],
  逆ナンパ: ["gyakunan"],
  // situation - 初性
  初撮り: ["hatsudori"],
  素人初撮り: ["hatsudori"],
  デビュー作品: ["debut"],
  "AV女優": [],

  // girl_type - 属性
  女子大生: ["joshidai"],
  人妻: ["hitozuma"],
  若妻: ["hitozuma"],
  ママ: ["hitozuma"],
  熟女: ["jukujo"],

  // girl_type - ルックス
  ギャル: ["gyaru"],
  "ギャル・ギャル系": ["gyaru"],
  美少女: ["bijin"],
  童顔: ["dougan"],
  "ハーフ・クォーター": ["half"],

  // girl_type - 体型
  巨乳: ["kyonyu"],
  爆乳: ["bakunyu"],
  貧乳: ["binyu"],
  微乳: ["binyu"],
  スレンダー: ["slender"],
  ぽっちゃり: ["pocchari"],
  色白: ["shiroi"],
  色黒: ["hiyake"],

  // shooting_style
  ハメ撮り: ["pov"],
  個人撮影: ["gachi"],
  ドキュメンタリー: ["doc"],
  "ドキュメント": ["doc"],

  // place_mood
  野外・露出: ["outdoor"],
  カーセックス: ["car"],
};

/**
 * レーベル名 → 独自タグ slug のマッピング
 * 部分一致（レーベル名に含まれていればマッチ）
 */
export const LABEL_HINT_TAGS: Array<{ pattern: RegExp; tags: Tag["slug"][] }> = [
  { pattern: /シロウトTV|素人TV|ナンパTV/, tags: ["nampa", "doc"] },
  { pattern: /MM号|マジックミラー/, tags: ["nampa", "monitor"] },
  { pattern: /プレステージ.*素人/, tags: ["high-res"] },
  { pattern: /マッチ(ン|ング)/, tags: ["matching"] },
];

/**
 * comment (商品説明) へのキーワード正規表現 → 独自タグ slug
 * 説明文に含まれていればタグを付与
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
  { pattern: /ガチ(素人|の素人|ンコ)/, tags: ["gachi"] },
];
