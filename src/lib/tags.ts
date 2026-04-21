import type { Tag, TagCategory } from "./types.ts";

export const TAG_CATEGORY_LABEL: Record<TagCategory, string> = {
  girl_type: "女の子のタイプ",
  situation: "出会い方・関係性",
  shooting_style: "撮影スタイル",
  place_mood: "場所・ムード",
};

export const TAGS: Tag[] = [
  // girl_type - ルックス
  {
    slug: "seiso",
    label: "清楚系",
    category: "girl_type",
    subcategory: "looks",
    description:
      "おとなしく真面目そうな清楚系素人女性が主役の作品を集めた特集。ギャップ萌え・上品な雰囲気が好きな方に。日常では見せない本当の一面が詰まった素人動画を厳選。",
  },
  {
    slug: "gyaru",
    label: "ギャル",
    category: "girl_type",
    subcategory: "looks",
    description:
      "派手で積極的なギャル素人の作品一覧。明るい肌色、ノリの良さ、開放的な性格が魅力。ギャル系素人のリアルなハメ撮りやナンパ企画をまとめて紹介。",
  },
  {
    slug: "bijin",
    label: "美人系",
    category: "girl_type",
    subcategory: "looks",
    description:
      "整った顔立ちの美人系素人女性が出演する作品。モデルレベルのルックスを持つガチ素人の貴重な映像。顔重視で素人を選びたい方におすすめ。",
  },
  {
    slug: "soboku",
    label: "素朴系",
    category: "girl_type",
    subcategory: "looks",
    description:
      "飾らない自然体・素朴系の素人女性による作品集。普段着のような雰囲気、身近な可愛さ。作られていないリアル感を求める方に向いたタグ。",
  },
  {
    slug: "dougan",
    label: "童顔",
    category: "girl_type",
    subcategory: "looks",
    description:
      "童顔・幼めの顔立ちの素人女性が登場する作品。実年齢は成人だが見た目の可愛らしさが際立つタイプ。童顔好きのための厳選素人動画。",
  },
  {
    slug: "jimi",
    label: "地味系",
    category: "girl_type",
    subcategory: "looks",
    description:
      "一見地味だけど脱いだらすごい、ギャップ系の素人女性作品。普段眼鏡で控えめ、実は性欲旺盛という意外性。地味系素人が好みの方へ。",
  },
  {
    slug: "half",
    label: "ハーフ顔",
    category: "girl_type",
    subcategory: "looks",
    description:
      "ハーフ・クォーター顔立ちの素人女性による作品。異国情緒ある雰囲気、彫りの深い顔、珍しいルックスを求める方に。",
  },
  {
    slug: "model",
    label: "モデル系",
    category: "girl_type",
    subcategory: "looks",
    description:
      "モデル体型・読者モデル級のルックスを持つ素人女性による作品。足の長さ、小顔、スタイル抜群のガチ素人。",
  },
  // girl_type - 体型
  {
    slug: "slender",
    label: "スレンダー",
    category: "girl_type",
    subcategory: "body",
    description:
      "細身・スレンダー体型の素人女性が出演する作品。スラッとした身体のラインを楽しみたい方に。痩せ型素人の動画をまとめて紹介。",
  },
  {
    slug: "kyonyu",
    label: "巨乳",
    category: "girl_type",
    subcategory: "body",
    description:
      "巨乳素人女性が主役の作品一覧。DカップからFカップ前後の迫力ボディ。素人ならではのリアルな巨乳映像を厳選。",
  },
  {
    slug: "binyu",
    label: "微乳",
    category: "girl_type",
    subcategory: "body",
    description:
      "微乳・貧乳の素人女性が出演する作品。AAカップ〜Bカップの控えめで可愛らしい胸元。微乳好きにおすすめの素人作品集。",
  },
  {
    slug: "bakunyu",
    label: "爆乳",
    category: "girl_type",
    subcategory: "body",
    description:
      "爆乳素人女性による作品。Gカップ以上のボリューム感、圧倒的な胸の迫力。ガチ素人の爆乳映像を集めた特集ページ。",
  },
  {
    slug: "pocchari",
    label: "ぽっちゃり",
    category: "girl_type",
    subcategory: "body",
    description:
      "ぽっちゃり・むっちり体型の素人女性による作品。柔らかな肉感、安らぎ感、肉付きの良いガチ素人を求める方へ。",
  },
  {
    slug: "yasegata",
    label: "痩せ型",
    category: "girl_type",
    subcategory: "body",
    description:
      "痩せ型・華奢な素人女性の作品集。アバラが見えるほど細い体型、壊れそうな儚さが魅力のタイプ。",
  },
  {
    slug: "shiroi",
    label: "色白",
    category: "girl_type",
    subcategory: "body",
    description:
      "色白・雪肌素人女性の作品。透き通るような白い肌が美しいタイプ。色白好きにおすすめの素人動画を厳選。",
  },
  {
    slug: "hiyake",
    label: "日焼け",
    category: "girl_type",
    subcategory: "body",
    description:
      "日焼け肌・褐色の素人女性の作品一覧。健康的な褐色肌、ビキニ跡、夏感ある素人映像。",
  },
  // girl_type - 雰囲気
  {
    slug: "otonashii",
    label: "おとなしい",
    category: "girl_type",
    subcategory: "mood",
    description:
      "おとなしい・内気な性格の素人女性による作品。緊張しながら撮影に挑むリアルな姿、恥じらいの表情が魅力。",
  },
  {
    slug: "sekkyokuteki",
    label: "積極的",
    category: "girl_type",
    subcategory: "mood",
    description:
      "積極的・ガツガツ型の素人女性作品。自分から仕掛ける姿勢、性欲旺盛な素人を楽しめる特集。",
  },
  {
    slug: "majime",
    label: "真面目",
    category: "girl_type",
    subcategory: "mood",
    description:
      "真面目・堅物そうな素人女性の作品。普段の真面目さと撮影中のギャップが堪らないタイプ。",
  },
  {
    slug: "tennen",
    label: "天然",
    category: "girl_type",
    subcategory: "mood",
    description:
      "天然・不思議ちゃん系の素人女性による作品。独特の間合い、予測不能な言動、素のリアクションが魅力。",
  },
  {
    slug: "do-s",
    label: "ドS",
    category: "girl_type",
    subcategory: "mood",
    description:
      "ドS・女王様気質の素人女性による作品。攻め好き、口調が強めのタイプ。支配願望ある方に。",
  },
  {
    slug: "do-m",
    label: "ドM",
    category: "girl_type",
    subcategory: "mood",
    description:
      "ドM・受け身系の素人女性による作品。従順な姿、反応の豊かさ。調教・言葉責め系が好きな方にも。",
  },
  // girl_type - 属性
  {
    slug: "joshidai",
    label: "女子大生",
    category: "girl_type",
    subcategory: "attr",
    description:
      "女子大生素人の作品一覧。現役大学生、JD、学生の課外活動としての撮影。リアルキャンパスライフの中にいる素人女子。",
  },
  {
    slug: "ol",
    label: "OL",
    category: "girl_type",
    subcategory: "attr",
    description:
      "OL・オフィスワーカー素人の作品。スーツ姿、会社員の顔、昼と夜のギャップを楽しめる。キャリアウーマン系素人作品集。",
  },
  {
    slug: "hitozuma",
    label: "人妻",
    category: "girl_type",
    subcategory: "attr",
    description:
      "人妻・若妻・奥様素人の作品一覧。家庭の顔と女の顔、旦那にバレない素人人妻のリアルな映像。",
  },
  {
    slug: "jukujo",
    label: "熟女",
    category: "girl_type",
    subcategory: "attr",
    description:
      "熟女素人作品を厳選。40代〜50代の落ち着いた魅力、熟成した色気ある素人女性による動画。",
  },
  {
    slug: "chihou",
    label: "地方",
    category: "girl_type",
    subcategory: "attr",
    description:
      "地方在住・田舎の素人女性作品。都会では会えないタイプ、方言・訛り、素朴な雰囲気を楽しめる。",
  },
  {
    slug: "joukyou",
    label: "上京系",
    category: "girl_type",
    subcategory: "attr",
    description:
      "地方から上京してきた素人女性の作品。都会慣れしていない初々しさ、上京間もない時期の作品を特集。",
  },

  // situation - 出会い方
  {
    slug: "nampa",
    label: "ナンパ",
    category: "situation",
    subcategory: "meet",
    description:
      "ナンパで出会った素人女性を撮影した作品の一覧。街角でのガチナンパ、素人ならではのリアルなやり取り、口説きから挿入まで全て収録した素人動画を厳選。",
  },
  {
    slug: "matching",
    label: "マッチングアプリ",
    category: "situation",
    subcategory: "meet",
    description:
      "マッチングアプリで知り合った素人女性との作品集。アプリ経由だからこその生々しいやり取り、初対面のドキドキ感。マッチングアプリ素人の人気作品。",
  },
  {
    slug: "aiseki",
    label: "相席",
    category: "situation",
    subcategory: "meet",
    description:
      "相席屋・相席ラウンジで出会った素人女性の作品。酒の勢い、偶然の出会い、その日のうちに撮影まで至るリアルな展開。",
  },
  {
    slug: "sns",
    label: "SNS募集",
    category: "situation",
    subcategory: "meet",
    description:
      "SNSで募集して集まった素人女性による作品。Twitter・Instagram等での公募、応募動機の生々しさが魅力。",
  },
  {
    slug: "monitor",
    label: "モニター企画",
    category: "situation",
    subcategory: "meet",
    description:
      "モニター企画・マジックミラー号など、企画系で素人女性が撮影に至る作品。演出と素人感のハイブリッドで楽しめる特集。",
  },
  {
    slug: "gyakunan",
    label: "逆ナン",
    category: "situation",
    subcategory: "meet",
    description:
      "素人女性からの逆ナンパを発端とした作品。女性主導の展開、性欲旺盛な素人女性のリアル。",
  },
  {
    slug: "papakatsu",
    label: "パパ活",
    category: "situation",
    subcategory: "meet",
    description:
      "パパ活女子との素人作品集。援助目的の女性とのリアルな駆け引き、金銭授受の後の関係性が収録された作品。",
  },
  // situation - 初性
  {
    slug: "debut",
    label: "AVデビュー",
    category: "situation",
    subcategory: "experience",
    description:
      "素人のAVデビュー作品集。初めての撮影現場、緊張と興奮、デビュー記念の貴重な一本。新人素人の第一作をまとめて紹介。",
  },
  {
    slug: "hatsudori",
    label: "初撮り",
    category: "situation",
    subcategory: "experience",
    description:
      "素人の初撮り作品一覧。はじめてカメラの前で見せる姿、未加工の素人そのままのリアクション、初撮り特有の生々しさが魅力の動画を厳選。",
  },
  {
    slug: "nikaime",
    label: "2回目",
    category: "situation",
    subcategory: "experience",
    description:
      "素人の2回目撮影作品。初撮り後の慣れとリラックス感、初作よりリアルな反応を楽しみたい方向け。",
  },
  {
    slug: "jouren",
    label: "常連",
    category: "situation",
    subcategory: "experience",
    description:
      "複数作品に出演している常連素人女性の作品集。AV女優並みに慣れたが素人のまま、変化する表情を追える。",
  },
  // situation - 動機
  {
    slug: "fukugyou",
    label: "副業",
    category: "situation",
    subcategory: "motive",
    description:
      "副業・お小遣い稼ぎ目的で撮影に挑む素人女性の作品。日常の裏側、生々しい事情込みの素人動画。",
  },
  {
    slug: "shakkin",
    label: "借金",
    category: "situation",
    subcategory: "motive",
    description:
      "借金返済目的で出演した素人女性の作品一覧。切羽詰まった事情、背景ストーリーが重い素人ドキュメント。",
  },
  {
    slug: "nori",
    label: "ノリ",
    category: "situation",
    subcategory: "motive",
    description:
      "軽いノリ・その場の勢いで撮影に至った素人女性の作品。軽さと素人感が際立つカジュアル系動画集。",
  },
  {
    slug: "roshutsu",
    label: "露出好き",
    category: "situation",
    subcategory: "motive",
    description:
      "露出癖・露出好きな素人女性の作品。見られる興奮、野外露出、人前での行為を楽しむリアル素人特集。",
  },
  {
    slug: "seiyoku",
    label: "性欲強め",
    category: "situation",
    subcategory: "motive",
    description:
      "性欲旺盛な素人女性の作品集。普段から性的関心が強い、ガッつく姿が見られるタイプ。",
  },

  // shooting_style
  {
    slug: "pov",
    label: "ハメ撮りPOV",
    category: "shooting_style",
    description:
      "男性視点・POVでのハメ撮り作品。視聴者と同じ目線で楽しめる没入型素人動画。ハメ撮り愛好家に人気のタグ。",
  },
  {
    slug: "fixed",
    label: "固定カメラ",
    category: "shooting_style",
    description:
      "固定カメラで撮影された素人作品。定点視点で全体を客観視できるスタイル、俯瞰で楽しみたい方向け。",
  },
  {
    slug: "multi",
    label: "マルチアングル",
    category: "shooting_style",
    description:
      "複数カメラ・マルチアングル編集の素人作品。様々な角度からの映像を切り替えながら楽しめる。",
  },
  {
    slug: "smartphone",
    label: "スマホ撮影",
    category: "shooting_style",
    description:
      "スマートフォンで撮影されたリアル素人作品。プロ機材ではない生々しさ、個人撮影感が魅力。",
  },
  {
    slug: "tategami",
    label: "縦撮り",
    category: "shooting_style",
    description:
      "縦画面・縦撮りの素人動画。スマホ視聴に最適化された縦長映像、TikTok風の素人作品。",
  },
  {
    slug: "high-res",
    label: "高画質",
    category: "shooting_style",
    description:
      "高画質・HD/4K撮影の素人作品。細部までくっきり映る、プレステージ等の高品質レーベル素人企画を厳選。",
  },
  {
    slug: "doc",
    label: "ドキュメント調",
    category: "shooting_style",
    description:
      "ドキュメンタリー風・ドキュメント調の素人作品。撮影前後のインタビュー、リアルドキュメント手法で追うタイプ。",
  },
  {
    slug: "enshutsu",
    label: "演出感強め",
    category: "shooting_style",
    description:
      "演出・脚本が効いた素人作品。ドラマ仕立て、企画モノ、演出感ある素人動画を楽しみたい方向け。",
  },
  {
    slug: "gachi",
    label: "ガチ感",
    category: "shooting_style",
    description:
      "演出感ゼロのガチ素人作品。個人撮影や投稿系、リアル感重視のコアな素人映像を厳選。",
  },
  {
    slug: "yarase",
    label: "やらせ感",
    category: "shooting_style",
    description:
      "やらせ感・作為的な素人作品。企画モノとして割り切って楽しみたい方向けのエンタメ素人動画。",
  },

  // place_mood
  {
    slug: "hotel",
    label: "ホテル",
    category: "place_mood",
    subcategory: "place",
    description:
      "ホテルで撮影された素人作品。シティホテル・ビジネスホテルなど、ホテル特有の清潔感ある背景の素人動画。",
  },
  {
    slug: "home",
    label: "自宅",
    category: "place_mood",
    subcategory: "place",
    description:
      "自宅・彼女の部屋で撮影された素人作品。生活感ある日常の中のリアル素人映像。",
  },
  {
    slug: "lovehotel",
    label: "ラブホ",
    category: "place_mood",
    subcategory: "place",
    description:
      "ラブホテルで撮影された素人作品集。ラブホ独特の雰囲気、ベッドまわりの設備、素人ハメ撮りの定番舞台。",
  },
  {
    slug: "outdoor",
    label: "野外",
    category: "place_mood",
    subcategory: "place",
    description:
      "野外・屋外で撮影された素人作品。公園・駐車場・屋上など露出スリル込みの素人動画。",
  },
  {
    slug: "car",
    label: "車内",
    category: "place_mood",
    subcategory: "place",
    description:
      "車内・カーセックス素人作品。狭い密室感、駐車場での密会、ドライブ途中のシチュエーション。",
  },
  {
    slug: "hiru",
    label: "昼",
    category: "place_mood",
    subcategory: "time",
    description:
      "昼間撮影の素人作品。明るい日差しのもとで映される素人女性の姿、昼間ならではの生々しさ。",
  },
  {
    slug: "yoru",
    label: "夜",
    category: "place_mood",
    subcategory: "time",
    description:
      "夜間撮影の素人作品。暗めの照明、夜の密会感、夜の方がリアル感を求める方向け。",
  },
  {
    slug: "akarui",
    label: "明るい",
    category: "place_mood",
    subcategory: "atmosphere",
    description:
      "照明が明るめ・全体が見える素人作品。隅々まで映される明るい雰囲気の動画。",
  },
  {
    slug: "kuragame",
    label: "暗め",
    category: "place_mood",
    subcategory: "atmosphere",
    description:
      "暗め照明・暗がりシーンの素人作品。密会感や秘密感のある暗い雰囲気を好む方向け。",
  },
  {
    slug: "namanamashii",
    label: "生々しい",
    category: "place_mood",
    subcategory: "atmosphere",
    description:
      "生々しさ・リアル感を重視した素人作品。演出感を排した、生の素人映像そのものを楽しめる。",
  },
  {
    slug: "seiketsu",
    label: "清潔感",
    category: "place_mood",
    subcategory: "atmosphere",
    description:
      "清潔感ある舞台・背景での素人作品。きれいなホテル・整った部屋など見た目の良さ重視の動画。",
  },
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
