import { ImageResponse } from "next/og";

export const alt = "素人系ナビ - タイトルじゃ分からない素人系を、中身で探す";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人系ナビ";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0B0B0F 0%, #16161D 50%, #1F1F28 100%)",
          color: "#F5F5F7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 480,
            height: 480,
            borderRadius: "100%",
            background: "rgba(255, 43, 133, 0.25)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#FF2B85",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              background: "#FF2B85",
              color: "white",
              fontSize: 32,
              fontWeight: 900,
              borderRadius: 12,
            }}
          >
            素
          </div>
          {siteName}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: -2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>タイトルじゃ分からない</div>
          <div style={{ display: "flex" }}>
            <span style={{ color: "#FF2B85" }}>素人系</span>
            <span>を、中身で探す。</span>
          </div>
        </div>
        <div style={{ marginTop: 32, fontSize: 28, color: "#9A9AA5" }}>
          女の子のタイプ × シチュ × 撮影スタイル × 場所
        </div>
      </div>
    ),
    size,
  );
}
