/**
 * DLsite アフィリエイト広告枠（ビジュアル特化・文字なし）。
 * 登録後は imageSrc / videoSrc に DLsite 提供のバナーを入れる。
 */

const DLSITE_AFFID = process.env.NEXT_PUBLIC_DLSITE_AFFID ?? "";

type AdVariant = "square" | "tall" | "banner";

type Props = {
  /** アスペクト比 */
  variant?: AdVariant;
  /** リンク先カテゴリ */
  category?: "maniax" | "girlside" | "general";
  /** 広告画像 URL（登録後に DLsite 提供のバナーURLを入れる） */
  imageSrc?: string;
  /** 広告動画 URL（アニメーションバナー、GIF/WebM/MP4） */
  videoSrc?: string;
  /** プレースホルダーのトーン */
  tone?: "pink" | "purple" | "warm";
};

const CATEGORY_URLS: Record<string, string> = {
  maniax: "https://www.dlsite.com/maniax/",
  girlside: "https://www.dlsite.com/girls/",
  general: "https://www.dlsite.com/home/",
};

function buildUrl(category: Props["category"] = "maniax") {
  const base = CATEGORY_URLS[category];
  if (!DLSITE_AFFID) return base;
  return `${base}?utm_medium=affiliate&utm_source=${encodeURIComponent(DLSITE_AFFID)}`;
}

export function DLsiteAd({
  variant = "tall",
  category = "maniax",
  imageSrc,
  videoSrc,
  tone = "pink",
}: Props) {
  const url = buildUrl(category);

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
      className={`group relative block w-full overflow-hidden rounded-xl border border-border bg-black transition hover:border-primary/60 ${variantClasses}`}
      aria-label="広告 (PR)"
    >
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
      ) : imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageSrc} alt="" className="h-full w-full object-cover" />
      ) : (
        <PlaceholderVisual tone={tone} />
      )}

      {/* 右上の超小さい PR マーク（規約対応、文字は最小限） */}
      <span className="pointer-events-none absolute right-1 top-1 rounded bg-black/60 px-1 py-0.5 text-[9px] leading-none text-white/80 backdrop-blur">
        PR
      </span>
    </a>
  );
}

/**
 * 画像・動画がまだ無い時のCSSプレースホルダー（揺れる演出）
 */
function PlaceholderVisual({ tone }: { tone: NonNullable<Props["tone"]> }) {
  const grad = {
    pink: "from-[#ff2b85] via-[#b11e66] to-[#1f1f28]",
    purple: "from-[#8a2be2] via-[#5a1a9b] to-[#16161d]",
    warm: "from-[#ff6a88] via-[#ff99ac] to-[#0b0b0f]",
  }[tone];

  return (
    <div className={`relative h-full w-full bg-gradient-to-br ${grad}`}>
      {/* 揺れる大きな球体（おっぱい感のあるアニメーション） */}
      <div
        className="absolute left-[25%] top-[35%] h-[45%] w-[45%] rounded-full bg-white/40 blur-xl"
        style={{ animation: "bounce-blob 1.8s ease-in-out infinite" }}
      />
      <div
        className="absolute left-[45%] top-[40%] h-[42%] w-[42%] rounded-full bg-white/30 blur-xl"
        style={{
          animation: "bounce-blob 1.8s ease-in-out infinite",
          animationDelay: "0.2s",
        }}
      />
      {/* ハイライト */}
      <div
        className="absolute left-[35%] top-[40%] h-[15%] w-[15%] rounded-full bg-white/80 blur-md"
        style={{ animation: "bounce-blob 1.8s ease-in-out infinite" }}
      />
      <div
        className="absolute left-[55%] top-[45%] h-[13%] w-[13%] rounded-full bg-white/70 blur-md"
        style={{
          animation: "bounce-blob 1.8s ease-in-out infinite",
          animationDelay: "0.2s",
        }}
      />
      {/* 光のオーバーレイ */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
      />
      <style>{`
        @keyframes bounce-blob {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6%) scale(1.04); }
        }
      `}</style>
    </div>
  );
}

/**
 * サイドバー用: 2〜3個の広告を縦積みにするコンテナ
 */
export function DLsiteAdSidebar({ side = "right" }: { side?: "left" | "right" }) {
  return (
    <aside className="hidden space-y-4 lg:block">
      <DLsiteAd variant="tall" category="maniax" tone="pink" />
      <DLsiteAd variant="tall" category="general" tone="purple" />
      <DLsiteAd variant="banner" category="girlside" tone="warm" />
      {/* suppress unused param */}
      <span className="hidden">{side}</span>
    </aside>
  );
}
