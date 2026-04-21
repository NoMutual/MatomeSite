"use client";
import { useState } from "react";

type Props = {
  thumbnail?: string;
  videoUrl?: string;
  title: string;
};

/**
 * 作品詳細のヒーロー動画プレイヤー。
 * 画像 + 中央に半透明再生ボタン → クリックで動画差し替え。
 */
export function SampleMoviePlayer({ thumbnail, videoUrl, title }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
      {playing && videoUrl ? (
        <video
          src={videoUrl}
          controls
          autoPlay
          className="h-full w-full object-contain"
        />
      ) : (
        <>
          {thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover"
            />
          )}
          {videoUrl && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="サンプル動画を再生"
              className="group absolute inset-0 flex items-center justify-center bg-black/10 transition hover:bg-black/40"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/70 bg-white/10 shadow-lg backdrop-blur-sm transition group-hover:scale-105 group-hover:bg-primary/40 group-hover:border-primary md:h-24 md:w-24">
                <span className="ml-1 text-3xl text-white md:text-4xl">▶</span>
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
