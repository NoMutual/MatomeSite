/**
 * DLsite アフィリエイト広告枠。
 * 登録後、アフィリエイトIDが発行されたら NEXT_PUBLIC_DLSITE_AFFID を設定して
 * DLsite 公式のリンク形式に差し替えます。
 */

const DLSITE_AFFID = process.env.NEXT_PUBLIC_DLSITE_AFFID ?? "";

type AdVariant = "square" | "tall" | "banner";

type Props = {
  variant?: AdVariant;
  category?: "maniax" | "girlside" | "general";
  label?: string;
};

const CATEGORY_URLS: Record<string, string> = {
  maniax: "https://www.dlsite.com/maniax/",
  girlside: "https://www.dlsite.com/girls/",
  general: "https://www.dlsite.com/home/",
};

const CATEGORY_LABEL: Record<string, string> = {
  maniax: "同人・エロゲー",
  girlside: "女性向け",
  general: "全体",
};

function buildUrl(category: Props["category"] = "maniax") {
  const base = CATEGORY_URLS[category];
  if (!DLSITE_AFFID) return base;
  // DLsite 標準のアフィリエイトURL形式: ?utm_medium=affiliate&utm_source=<affid>
  return `${base}?utm_medium=affiliate&utm_source=${encodeURIComponent(DLSITE_AFFID)}`;
}

export function DLsiteAd({ variant = "square", category = "maniax", label }: Props) {
  const url = buildUrl(category);
  const displayLabel = label ?? CATEGORY_LABEL[category];

  const variantClasses = {
    square: "aspect-square",
    tall: "aspect-[3/4]",
    banner: "aspect-[3/1]",
  }[variant];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener sponsored"
      className={`group relative block w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface via-surface-2 to-[#1a0a14] transition hover:border-primary/50 ${variantClasses}`}
    >
      {/* アクセント装飾 */}
      <div
        aria-hidden
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/30 blur-2xl"
      />

      <div className="relative flex h-full w-full flex-col justify-between p-4">
        <div>
          <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white/90 backdrop-blur">
            <span>PR</span>
          </div>
          <div className="mt-3 text-base font-black leading-tight text-text md:text-lg">
            DLsite
          </div>
          <div className="text-[11px] text-muted">{displayLabel}</div>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] leading-relaxed text-muted">
            同人・エロゲー・ボイス作品なら
            <br />
            国内最大級の DLsite で。
          </p>
          <div className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-bold text-white transition group-hover:bg-primary-2">
            見に行く →
          </div>
        </div>
      </div>
    </a>
  );
}

/**
 * サイドバー用: 2〜3個の広告を縦積みにするコンテナ
 */
export function DLsiteAdSidebar({ side = "right" }: { side?: "left" | "right" }) {
  return (
    <aside className="hidden space-y-4 lg:block">
      <div className="text-[10px] font-bold tracking-wider text-muted/60 uppercase">
        {side === "left" ? "PR" : "Sponsored"}
      </div>
      <DLsiteAd variant="tall" category="maniax" />
      <DLsiteAd variant="tall" category="general" label="同人・音声・CG集" />
      <DLsiteAd variant="banner" category="girlside" />
    </aside>
  );
}
