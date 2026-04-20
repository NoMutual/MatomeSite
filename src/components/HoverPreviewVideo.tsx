"use client";
import { useRef, useState } from "react";

type Props = {
  thumbnail?: string;
  videoUrl?: string;
  alt: string;
};

/**
 * ホバー時にサンプル動画を再生するカードメディア領域。
 * videoUrl 未指定 or モバイルでは画像のみ表示。
 */
export function HoverPreviewVideo({ thumbnail, videoUrl, alt }: Props) {
  const [hovered, setHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    if (!videoUrl) return;
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
    setVideoReady(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative h-full w-full"
    >
      {thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumbnail}
          alt={alt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      {hovered && videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {videoUrl && (
        <div className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-[10px] text-white opacity-80 backdrop-blur">
          ▶
        </div>
      )}
    </div>
  );
}
