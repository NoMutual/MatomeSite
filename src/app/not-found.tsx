import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center py-12 text-center md:py-20">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <span className="text-4xl font-black">404</span>
      </div>
      <h1 className="mt-6 text-2xl font-bold md:text-3xl">
        ページが見つかりません
      </h1>
      <p className="mt-3 text-sm text-muted">
        お探しのページは削除されたか、URLが変更された可能性があります。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="h-11 rounded-lg bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-2"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          ホームへ戻る
        </Link>
        <Link
          href="/works"
          className="h-11 rounded-lg border border-border bg-surface px-5 text-sm font-bold transition hover:border-muted"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          作品を探す
        </Link>
      </div>
    </div>
  );
}
