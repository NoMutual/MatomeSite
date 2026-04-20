export const metadata = {
  title: "お問い合わせ",
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">お問い合わせ</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          以下に該当するお問い合わせを受け付けています。
        </p>
      </div>

      <ul className="space-y-2 rounded-xl border border-border bg-surface p-5 text-sm text-muted">
        <li>• サイトに関するご意見・ご要望</li>
        <li>• 掲載情報の誤り・修正依頼</li>
        <li>• タグ付けの誤りの報告</li>
        <li>• 著作権に関するお問い合わせ</li>
      </ul>

      <section className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <p className="text-sm">
          現在、お問い合わせフォームは準備中です。
          <br />
          恐れ入りますが、しばらくお待ちください。
        </p>
      </section>

      <section className="space-y-3 text-xs text-muted">
        <p>
          ※ 商品・配信内容に関するお問い合わせは、FANZA 公式サポートへお願いいたします。
        </p>
        <p>※ 営業・広告掲載依頼等は現在お受けしておりません。</p>
      </section>
    </article>
  );
}
