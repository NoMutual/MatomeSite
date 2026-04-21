"use client";
import { useEffect, useRef } from "react";

type BlogPartsConfig = {
  base: string;
  type: "keyword" | "new" | "ranking" | "genre";
  site: string;
  query?: Record<string, unknown>;
  title?: string;
  display?: "vertical" | "horizontal";
  detail?: string;
  column?: "v" | "h";
  image?: "small" | "large";
  count?: string;
  wrapper?: string;
  autorotate?: boolean;
  aid: string;
};

type Props = {
  config: BlogPartsConfig;
  /** この id を使って複数枠を同一ページに置ける */
  containerId?: string;
};

/**
 * DLsite 公式ブログパーツ（keyword/new/ranking等を自動ローテート表示するJS widget）。
 * CSP の script-src / connect-src / img-src に www.dlsite.com 許可が必要。
 */
export function DLsiteBlogparts({ config, containerId = "dlsite-bp" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // DLsite 公式スクリプトがグローバルの `blogparts` を参照するので事前注入
    (window as unknown as { blogparts: BlogPartsConfig }).blogparts = config;

    const script = document.createElement("script");
    script.src = "https://www.dlsite.com/js/blogparts.js";
    script.charset = "UTF-8";
    script.async = true;
    ref.current.appendChild(script);

    return () => {
      // クリーンアップ（SPA 遷移時）
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [config]);

  return <div id={containerId} ref={ref} className="w-full" />;
}
