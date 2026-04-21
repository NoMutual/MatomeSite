"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * キーワード検索ボックス。submit で /search/[keyword] に遷移する
 * (SEO上パス型 URL の方がインデックスされやすいため)
 */
export function KeywordSearchBox({ className }: { className?: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const kw = value.trim();
    if (!kw) return;
    router.push(`/search/${encodeURIComponent(kw)}`);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        type="search"
        name="keyword"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="作品を検索..."
        className="h-9 w-56 rounded-lg border border-border bg-surface px-3 text-sm placeholder:text-muted/70 focus:border-primary focus:outline-none"
      />
    </form>
  );
}
