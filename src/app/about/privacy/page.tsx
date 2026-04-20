const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人系ナビ";

export const metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <article className="prose-article mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">プライバシーポリシー</h1>
        <p className="mt-2 text-xs text-muted">最終更新: 2026年4月</p>
      </div>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold">1. 取得する情報</h2>
        <p className="text-muted">
          {siteName}（以下「当サイト」）は、サイト利用状況の把握と改善のため、
          以下の情報を取得する場合があります。
        </p>
        <ul className="list-disc space-y-1 pl-5 text-muted">
          <li>アクセスログ（IPアドレス、ブラウザ種別、参照元URL、訪問日時）</li>
          <li>Cookie による閲覧情報</li>
          <li>年齢確認の同意状態（ブラウザのローカルストレージ）</li>
        </ul>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold">2. アクセス解析ツール</h2>
        <p className="text-muted">
          当サイトではサイト改善のためアクセス解析ツールを使用する場合があります。
          これらは Cookie を使用して匿名の情報を収集しますが、個人を特定するものではありません。
          ブラウザ設定で Cookie を無効化することで拒否できます。
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold">3. アフィリエイトプログラム</h2>
        <p className="text-muted">
          当サイトは DUGA（APEXアフィリエイト）のアフィリエイトプログラムに参加しており、
          商品を紹介するためのリンクを掲載しています。
          これらのリンクを経由して購入が発生した場合、当サイトに報酬が支払われることがあります。
          ユーザーに追加の費用が発生することはありません。
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold">4. 第三者への情報提供</h2>
        <p className="text-muted">
          法令に基づく場合を除き、取得した情報を第三者に提供することはありません。
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold">5. 免責事項</h2>
        <p className="text-muted">
          当サイトに掲載された情報の正確性には万全を期していますが、
          情報が古くなっている場合や誤りを含む場合があります。
          リンク先のサービス・商品の利用は自己責任でお願いします。
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold">6. プライバシーポリシーの変更</h2>
        <p className="text-muted">
          本ポリシーは予告なく変更されることがあります。
          変更後の内容は当ページに掲載された時点から効力を生じます。
        </p>
      </section>
    </article>
  );
}
