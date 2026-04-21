# 素人の極み

> 素人をただ極めて行け。

タイトルじゃ分からない素人系作品を、極みタグ（女の子のタイプ・シチュエーション・撮影スタイル・場所）で絞り込んで探せるデータベース型アフィサイト。

## 🌐 本番URL

**https://shirouto-kiwami.com**

旧URL（互換保持）: https://matomesite.ima0hiro.workers.dev

## 🎯 コンセプト

素人系AVはタイトルが「〜ちゃん」等で**中身が分からない**。MissAV等の海賊版にも素人系は無い。
→ 検索で「清楚系 × マッチングアプリ × 初撮り」のように絞り込めて、**中身が分かって、買える**サイトを作る。

## 🏗️ 技術スタック

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4
- **Cloudflare Workers**（本番ホスティング、`@opennextjs/cloudflare` 経由）
- **DUGA Web Service API** (APEX アフィリエイト)
- **DLsite アフィリエイト**（サイドバー広告）
- **X API v2**（自動投稿 bot `@NoMutual_MATOME`）
- **GitHub Actions**（データ更新 3h毎 / X投稿 3h毎）

## 📂 データ管理

DBなし。`data/work-tags.json` 1ファイルに全作品データを保存（最大 1500 件、上限到達後は発売日が古い順に削除）。

## 🔄 自動化

| 内容 | スケジュール | ワークフロー |
|---|---|---|
| DUGA API から新着取得+タグ付け | 3時間ごと | `.github/workflows/update-tags.yml` |
| X へ動画付き自動投稿 | 3時間ごと | `.github/workflows/post-x.yml` |
| Cloudflare 再デプロイ | Git push 時 自動 | Cloudflare 側の連携 |

## 🚀 ローカル開発

```bash
# 依存インストール
npm install

# 環境変数設定
cp .env.local.example .env.local
# DUGA_APPID / DUGA_AGENTID / DUGA_BANNERID を記入

# 開発サーバー
npm run dev
# → http://localhost:3000

# 型チェック
npx tsc --noEmit

# バッチ: DUGA から作品取得+タグ付け
npm run tag

# バッチ: X に1件投稿
npm run post:x
```

## 📁 主なディレクトリ

```
src/
├── app/
│   ├── page.tsx                     # トップ (ランダムピック 6h rotate)
│   ├── works/                       # 作品一覧・詳細
│   ├── tags/[category]/[slug]/     # 個別タグページ
│   ├── combo/[slugs]/              # タグ掛け合わせページ (例: /combo/gyaru-nampa)
│   ├── search/[keyword]/           # キーワード検索 (例: /search/ナンパ)
│   ├── guides/                     # ガイド記事
│   └── about/                      # 法務ページ (privacy/disclaimer/contact)
├── components/
│   ├── WorkCard.tsx                # 作品カード + ホバー動画プレビュー
│   ├── SampleMoviePlayer.tsx       # 作品詳細の大きい動画プレイヤー
│   ├── FacetSearch.tsx             # /works のタグファセット検索
│   ├── DLsiteAd.tsx                # サイドバー広告 (DLsite実バナー)
│   └── ...
└── lib/
    ├── duga.ts                     # DUGA データアクセサ (ローカルJSON読み)
    ├── work-tags-store.ts          # タグ検索・組み合わせ
    ├── tags.ts                     # 極みタグ定義 (62タグ)
    └── tagger/                     # ルールベースタグ付けエンジン

data/
├── work-tags.json                  # 作品データ (500〜1500件)
└── x-posted.json                   # X投稿済 productid 管理

scripts/
├── tag-works.ts                    # DUGA取得+タグ付けバッチ
└── post-to-x.ts                    # X 自動投稿スクリプト
```

## 🏷️ 極みタグ体系（62タグ / 4軸）

| 軸 | 内容 | タグ例 |
|---|---|---|
| `girl_type` | 女の子のタイプ | 清楚系、ギャル、巨乳、スレンダー、人妻、女子大生 |
| `situation` | 出会い方・関係性 | ナンパ、マッチングアプリ、初撮り、AVデビュー、副業 |
| `shooting_style` | 撮影スタイル | ハメ撮りPOV、固定カメラ、ドキュメント調、ガチ感 |
| `place_mood` | 場所・ムード | ホテル、自宅、ラブホ、野外、明るい、暗め |

## 💰 収益経路

- **DUGA**（メイン）: 作品詳細「DUGAで見る」ボタン + X投稿リンク (agentid: 48917)
- **DLsite**（サブ）: `/works` 右サイドバーの広告バナー (affid: shiroutokiwami)

## 📜 規約遵守

- [APEX代理店規約](https://duga.jp/aff/rule.html) に準拠（動画は加工なしで転送、アフィリンク必須同梱、140秒超回避）
- 景表法ステマ規制対応（PR表記明示、12px bold）
- X Automation Rules 対応（bio に自動投稿bot 明記、NSFW フラグ）
- セキュリティヘッダ全面設定（CSP / HSTS / X-Frame-Options 他）

## ⚙️ Cloudflare デプロイ

```bash
npm run preview   # ローカルでopennext経由プレビュー
npm run deploy    # Cloudflareにデプロイ
```

環境変数は Cloudflare Workers の Variables and Secrets で設定：
- `DUGA_APPID` / `DUGA_AGENTID` / `DUGA_BANNERID`
- `NEXT_PUBLIC_SITE_URL=https://shirouto-kiwami.com`
