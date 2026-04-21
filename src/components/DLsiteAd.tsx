/**
 * DLsite アフィリエイト広告枠。
 * DLsite アフィリエイトページで発行した 300x250 バナー HTML を
 * そのまま使用（画像/リンクの加工なし、規約準拠）。
 */

type BannerKey = "maniax" | "books" | "pro";

const BANNERS: Record<
  BannerKey,
  { href: string; img: string; alt: string; width: number; height: number }
> = {
  // 男性向け 同人作品 Maniax → トップページ
  maniax: {
    href: "https://dlaf.jp/maniax/dlaf/=/aid/shiroutokiwami/url/https%3A%2F%2Fwww.dlsite.com%2Fmaniax%2F%3Futm_medium%3Daffiliate%26utm_campaign%3Dbnlink%26utm_content%3Dbn_sp_300_250_dojin_01.jpg",
    img: "https://www.dlsite.com/img/male/dojin/bn_sp_300_250_dojin_01.jpg",
    alt: "同人誌、同人ゲーム、同人ソフトのダウンロードショップ - DLsite",
    width: 300,
    height: 250,
  },
  // 男性向け 成年コミック Books → 週間ランキング
  books: {
    href: "https://dlaf.jp/books/dlaf/=/aid/shiroutokiwami/url/https%3A%2F%2Fwww.dlsite.com%2Fbooks%2Franking%2Fweek%2F%3Futm_medium%3Daffiliate%26utm_campaign%3Dbnlink%26utm_content%3Dbn_sp_300_250_dojin_01.jpg",
    img: "https://www.dlsite.com/img/male/dojin/bn_sp_300_250_dojin_01.jpg",
    alt: "成年コミック、エロ漫画、エロ小説 のダウンロードショップ - DLsite Books",
    width: 300,
    height: 250,
  },
  // 男性向け 商業作品 Pro → トップページ（エロゲ）
  pro: {
    href: "https://dlaf.jp/pro/dlaf/=/aid/shiroutokiwami/url/https%3A%2F%2Fwww.dlsite.com%2Fpro%2F%3Futm_medium%3Daffiliate%26utm_campaign%3Dbnlink%26utm_content%3Dbn_sp_300_250_dojin_01.jpg",
    img: "https://www.dlsite.com/img/female/dojin/bn_sp_300_250_dojin_01.jpg",
    alt: "エロゲ、エロアニメ、PCゲームのダウンロードショップ - DLsite Pro",
    width: 300,
    height: 250,
  },
};

type Props = {
  banner?: BannerKey;
};

export function DLsiteAd({ banner = "maniax" }: Props) {
  const b = BANNERS[banner];
  return (
    <a
      href={b.href}
      target="_blank"
      rel="noopener sponsored"
      className="group relative block w-full overflow-hidden rounded-xl border border-border bg-black transition hover:border-primary/60"
      aria-label="広告 (PR)"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={b.img}
        alt={b.alt}
        width={b.width}
        height={b.height}
        className="block h-auto w-full transition group-hover:scale-[1.02]"
      />
      {/* 右上の PR マーク（景表法ステマ規制・明瞭表示に準拠） */}
      <span className="pointer-events-none absolute right-1.5 top-1.5 rounded-md bg-black/80 px-1.5 py-0.5 text-xs font-bold leading-none text-white backdrop-blur">
        PR
      </span>
    </a>
  );
}

/**
 * サイドバー用: 3 種類のバナーを縦積み
 */
export function DLsiteAdSidebar({ side = "right" }: { side?: "left" | "right" }) {
  return (
    <aside className="hidden space-y-4 lg:block">
      <DLsiteAd banner="maniax" />
      <DLsiteAd banner="books" />
      <DLsiteAd banner="pro" />
      <span className="hidden">{side}</span>
    </aside>
  );
}
