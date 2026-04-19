# Fanza 素人系ナビ（仮）

FANZA の素人系作品を独自の属性タグで絞り込んで探せるデータベース型アフィリエイトサイト。

## コンセプト

素人系AVはタイトルが「〜ちゃん」等で**中身が分からない**。MissAV等の海賊版にも素人系は無い。
→ 検索で「清楚系 × ナンパ × 初撮り」のように絞り込めて、**中身が分かって、買える** サイトを作る。

## 技術スタック

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Cloudflare Pages（本番）/ `@cloudflare/next-on-pages`
- DMM Web Service API v3

## セットアップ

```bash
# 依存インストール
npm install

# 環境変数設定
cp .env.local.example .env.local
# DMM_API_ID / DMM_AFFILIATE_ID を記入

# 開発サーバー
npm run dev
# → http://localhost:3000
```

DMM API 認証情報が未設定でも UI は表示されます（API 呼び出し部分のみエラー表示）。

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx            # 全体レイアウト + 年齢確認
│   ├── page.tsx              # トップ（新着・タグ入口）
│   ├── works/
│   │   ├── page.tsx          # 作品一覧・キーワード検索
│   │   └── [cid]/page.tsx    # 作品詳細
│   └── tags/
│       ├── page.tsx          # タグ一覧
│       └── [category]/[slug]/page.tsx  # タグ別作品
├── components/
│   ├── AgeGate.tsx           # 18禁確認モーダル
│   ├── Header.tsx
│   └── WorkCard.tsx
└── lib/
    ├── types.ts              # DMM API 型定義
    ├── dmm.ts                # DMM API クライアント（floor=videoc固定）
    └── tags.ts               # 独自タグ定義（4軸）
```

## 独自タグ体系（4軸）

| 軸 | 中身 |
|---|---|
| `girl_type` | 女の子のタイプ（ルックス/体型/雰囲気/属性） |
| `situation` | 出会い方・関係性（ナンパ/マッチング/初撮り等） |
| `shooting_style` | 撮影スタイル（POV/固定/ガチ感/ドキュメント調等） |
| `place_mood` | 場所・ムード（ホテル/自宅/野外/明るい等） |

DMM 公式ジャンルと**重複しない**、タイトルから読み取れない情報を補完する設計。

## Cloudflare Pages デプロイ

```bash
npm run pages:build
npm run pages:deploy
```

環境変数は Cloudflare Pages ダッシュボードで設定。

## 現状の制約・次の作業

- [ ] DMM API 審査通過後に `.env.local` に認証情報を投入して動作確認
- [ ] 独自タグの**付与機構**未実装（次段階: LLM で自動タグ付け or 手動UI）
- [ ] ファセット検索の UI は未実装（タグページは雛形のみ）
- [ ] 作品詳細の「中身サマリ（独自生成文）」未実装
- [ ] sitemap.xml / robots.txt 未設定

## 規約遵守メモ

- DMM 公式素材（画像・動画）は改変しない
- バズリプ広告禁止、指名KWリスティング禁止
- 「PR」「広告」明示（ステマ規制対応）
- 18歳未満閲覧禁止（年齢確認モーダル実装済）
