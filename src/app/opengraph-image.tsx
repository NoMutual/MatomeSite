import { ImageResponse } from "next/og";

export const alt = "素人の極み - 素人をただ極めて行け。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "素人の極み";

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
            fontSize: 32,
            color: "#FF2B85",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              background: "#FF2B85",
              color: "white",
              fontSize: 36,
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
            marginTop: 48,
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: -4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>素人を、</div>
          <div style={{ display: "flex" }}>
            <span style={{ color: "#FF2B85" }}>ただ極めて行け</span>
            <span>。</span>
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
