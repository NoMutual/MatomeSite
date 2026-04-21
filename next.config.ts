import type { NextConfig } from "next";

const securityHeaders = [
  // クリックジャッキング防止（他サイトからの iframe 埋込禁止）
  { key: "X-Frame-Options", value: "DENY" },
  // MIMEスニッフィング防止
  { key: "X-Content-Type-Options", value: "nosniff" },
  // HTTPS 強制（1年、サブドメイン含む、プリロード対象）
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // リファラ送信を最小化（他サイトに閲覧元URLを漏らさない）
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 不要な権限 API を無効化（カメラ/マイク/位置情報など）
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // XSS フィルタ（レガシー対応）
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // 画像は DUGA の CDN を許可
      "img-src 'self' data: blob: https://pic.duga.jp https://pics.dmm.co.jp https://*.dlsite.com https://*.dlsite.jp",
      // サンプル動画は DUGA CDN のみ
      "media-src 'self' blob: https://affsample.duga.jp",
      // Next.js はインラインスクリプト・スタイルを使うので unsafe-inline 必要
      // DLsite ブログパーツの外部 JS を許可 (サブドメイン含む)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.dlsite.com https://*.dlsite.jp",
      "style-src 'self' 'unsafe-inline' https://*.dlsite.com",
      // フォント
      "font-src 'self' data:",
      // DLsite ブログパーツが XHR/fetch する先
      "connect-src 'self' https://*.dlsite.com https://*.dlsite.jp",
      // DLsite 広告が iframe を使う場合に備えて許可
      "frame-src 'self' https://*.dlsite.com https://*.dlsite.jp https://dlaf.jp",
      // iframe 埋込禁止
      "frame-ancestors 'none'",
      "base-uri 'self'",
      // フォーム送信先
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pic.duga.jp" },
      { protocol: "https", hostname: "pics.dmm.co.jp" },
      { protocol: "https", hostname: "pics.dmm.com" },
      { protocol: "https", hostname: "cc3001.dmm.co.jp" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
