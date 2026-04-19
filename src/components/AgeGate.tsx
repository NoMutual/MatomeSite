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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-surface p-6 text-center">
        <h2 className="text-lg font-bold">年齢確認</h2>
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
            className="rounded bg-accent py-2 font-medium text-white hover:opacity-90"
          >
            18歳以上
          </button>
          <a
            href="https://www.google.com"
            className="rounded border border-border py-2 text-center"
          >
            18歳未満
          </a>
        </div>
      </div>
    </div>
  );
}
