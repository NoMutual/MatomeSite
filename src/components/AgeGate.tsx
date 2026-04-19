"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "agegate.confirmed.v1";

export function AgeGate() {
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  useEffect(() => {
    setConfirmed(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  if (confirmed === null || confirmed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4 backdrop-blur">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="text-xl font-black">18+</span>
        </div>
        <h2 className="mt-4 text-lg font-bold">年齢確認</h2>
        <p className="mt-3 text-sm text-muted">
          当サイトはアダルト商品を紹介しています。
          <br />
          あなたは18歳以上ですか？
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              localStorage.setItem(STORAGE_KEY, "1");
              setConfirmed(true);
            }}
            className="h-11 rounded-lg bg-primary font-bold text-white transition hover:bg-primary-2"
          >
            18歳以上
          </button>
          <a
            href="https://www.google.com"
            className="flex h-11 items-center justify-center rounded-lg border border-border text-sm text-muted hover:border-muted"
          >
            18歳未満
          </a>
        </div>
      </div>
    </div>
  );
}
