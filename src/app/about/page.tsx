import Link from "next/link";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人系ナビ";

export const metadata = {
  title: "サイトについて",
  description: `${siteName} の運営方針とサイト概要。`,
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">サイトについて</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {siteName} は、FANZA（DMM）で配信されている素人系作品を、
          タイトルだけでは分からない「中身の特徴」で検索できるデータベースサイトです。
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold">コンセプト</h2>
        <p className="text-sm leading-relaxed text-muted">
          素人系の作品はタイトルが「〇〇ちゃん」のような個人名になっていることが多く、
          何が収録されているのかが分かりにくい問題があります。
          本サイトでは各作品に独自タグ（女の子のタイプ・シチュエーション・撮影スタイル・場所）を付与し、
          タグの掛け合わせで作品を絞り込めるようにしています。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold">関連ページ</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/about/privacy" className="text-primary hover:text-primary-2">
              プライバシーポリシー
            </Link>
          </li>
          <li>
            <Link href="/about/disclaimer" className="text-primary hover:text-primary-2">
              免責事項・広告表記
            </Link>
          </li>
          <li>
            <Link href="/about/contact" className="text-primary hover:text-primary-2">
              お問い合わせ
            </Link>
          </li>
        </ul>
      </section>

      <section className="space-y-2 rounded-xl border border-border bg-surface p-5">
        <h2 className="text-sm font-bold">運営者情報</h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-xs">
          <dt className="text-muted">運営</dt>
          <dd>個人運営</dd>
          <dt className="text-muted">お問い合わせ</dt>
          <dd>
            <Link href="/about/contact" className="text-primary hover:text-primary-2">
              お問い合わせフォームへ
            </Link>
          </dd>
        </dl>
      </section>
    </article>
  );
}
