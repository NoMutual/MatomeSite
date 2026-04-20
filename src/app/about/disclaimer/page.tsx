const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人の極み";

export const metadata = {
  title: "免責事項・広告表記",
};

export default function DisclaimerPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">免責事項・広告表記</h1>
        <p className="mt-2 text-xs text-muted">最終更新: 2026年4月</p>
      </div>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold">広告表記（PR）</h2>
        <p className="text-muted">
          {siteName}（以下「当サイト」）は、DUGA（APEXアフィリエイト）のアフィリエイトプログラムに参加しています。
          当サイト内で紹介している商品・サービスには広告リンク（アフィリエイトリンク）が含まれており、
          これらのリンクを経由して購入・会員登録が行われた場合、
          当サイトに報酬が支払われる仕組みとなっています。
        </p>
        <p className="text-muted">
          広告リンクには「PR」「広告」と明示し、
          ユーザーの購入判断に影響を与えないよう客観的な情報掲載を心がけています。
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold">掲載情報について</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted">
          <li>
            商品の価格・販売状況・サンプル画像・内容は DUGA 公式サイト（duga.jp）から取得しており、
            変更される場合があります。最新情報は必ず公式サイトでご確認ください。
          </li>
          <li>
            極みタグは運営者が作品情報から推定したもので、実際の内容と一致しない場合があります。
          </li>
          <li>
            レビューの平均点・件数は DUGA 公式データを参照しています。
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold">著作権について</h2>
        <p className="text-muted">
          商品画像・動画・説明文の著作権は各メーカー・販売元に帰属します。
          当サイトは APEX（DUGA）アフィリエイトプログラムの規約に基づき、
          公式が提供する素材を改変せず利用しています。
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold">年齢制限</h2>
        <p className="text-muted">
          当サイトは成人向けコンテンツを紹介しており、
          18歳未満の方は閲覧することができません。
          サイト利用にあたっては年齢確認画面で 18 歳以上であることを確認いただいています。
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold">損害の免責</h2>
        <p className="text-muted">
          当サイトの利用、あるいは掲載情報に基づいて利用者または第三者に生じた損害について、
          当サイト運営者は一切の責任を負いません。
        </p>
      </section>
    </article>
  );
}
