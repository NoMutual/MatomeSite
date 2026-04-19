"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { TAGS, TAG_CATEGORY_LABEL } from "@/lib/tags";
import type { TagCategory } from "@/lib/types";

type Props = {
  tagCounts: Record<string, number>;
};

const SORT_OPTIONS = [
  { value: "date", label: "新着順" },
  { value: "rank", label: "人気順" },
  { value: "review", label: "レビュー順" },
] as const;

export function FacetSearch({ tagCounts }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const selectedTags = new Set((params.get("tags") ?? "").split(",").filter(Boolean));
  const keyword = params.get("keyword") ?? "";
  const sort = params.get("sort") ?? "date";
  const [draftKeyword, setDraftKeyword] = useState(keyword);

  const update = (next: URLSearchParams) => {
    const qs = next.toString();
    startTransition(() => router.push(qs ? `/works?${qs}` : "/works"));
  };

  const toggleTag = (slug: string) => {
    const next = new URLSearchParams(params);
    const current = new Set(selectedTags);
    if (current.has(slug)) current.delete(slug);
    else current.add(slug);
    if (current.size > 0) next.set("tags", [...current].join(","));
    else next.delete("tags");
    update(next);
  };

  const clearAll = () => update(new URLSearchParams());

  const submitKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (draftKeyword) next.set("keyword", draftKeyword);
    else next.delete("keyword");
    update(next);
  };

  const changeSort = (value: string) => {
    const next = new URLSearchParams(params);
    next.set("sort", value);
    update(next);
  };

  const activeCount = selectedTags.size + (keyword ? 1 : 0);

  return (
    <aside className="space-y-5">
      {/* 絞り込み中バッジ + クリア */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted">
          絞り込み中:{" "}
          <span className="font-bold text-text">{activeCount}</span>
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-primary hover:text-primary-2"
          >
            すべてクリア
          </button>
        )}
      </div>

      {/* キーワード */}
      <form onSubmit={submitKeyword}>
        <label className="mb-1.5 block text-[11px] font-semibold tracking-wider text-muted uppercase">
          キーワード
        </label>
        <input
          type="search"
          value={draftKeyword}
          onChange={(e) => setDraftKeyword(e.target.value)}
          placeholder="タイトル・説明文で検索"
          className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm placeholder:text-muted/60 focus:border-primary focus:outline-none"
        />
      </form>

      {/* 並び替え */}
      <div>
        <label className="mb-1.5 block text-[11px] font-semibold tracking-wider text-muted uppercase">
          並び替え
        </label>
        <div className="grid grid-cols-3 gap-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => changeSort(opt.value)}
              className={`rounded-md border px-2 py-1.5 text-xs transition ${
                sort === opt.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-bg text-muted hover:border-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* カテゴリ別タグ */}
      {(Object.entries(TAG_CATEGORY_LABEL) as [TagCategory, string][]).map(
        ([cat, label]) => {
          const tagsInCat = TAGS.filter((t) => t.category === cat);
          return (
            <div key={cat}>
              <div className="mb-1.5 text-[11px] font-semibold tracking-wider text-muted uppercase">
                {label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tagsInCat.map((tag) => {
                  const active = selectedTags.has(tag.slug);
                  const count = tagCounts[tag.slug] ?? 0;
                  return (
                    <button
                      key={tag.slug}
                      type="button"
                      onClick={() => toggleTag(tag.slug)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                        active
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-bg text-muted hover:border-primary/50 hover:text-text"
                      }`}
                    >
                      {tag.label}
                      {count > 0 && (
                        <span
                          className={`ml-1 ${
                            active ? "text-white/80" : "text-muted/60"
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        },
      )}

      {pending && (
        <div className="text-xs text-muted">絞り込み中...</div>
      )}
    </aside>
  );
}
