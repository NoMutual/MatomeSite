import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { TwitterApi } from "twitter-api-v2";
import type { DugaItem } from "../src/lib/types.ts";
import {
  getAffiliateLink,
  getSampleMovieUrl,
  getThumbnail,
} from "../src/lib/duga.ts";
import { TAG_BY_SLUG } from "../src/lib/tags.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TAGS_PATH = resolve(__dirname, "../data/work-tags.json");
const POSTED_PATH = resolve(__dirname, "../data/x-posted.json");

type TagsStore = {
  items: Record<string, { tags: string[]; date: string; item: DugaItem }>;
};
type PostedStore = { last_posted_at: string | null; productids: string[] };

async function loadJson<T>(path: string): Promise<T> {
  const text = await readFile(path, "utf-8");
  return JSON.parse(text) as T;
}

function pickWork(
  store: TagsStore,
  postedIds: Set<string>,
): { productid: string; item: DugaItem; tags: string[] } | null {
  const candidates = Object.entries(store.items)
    .filter(([pid, v]) => {
      if (postedIds.has(pid)) return false;
      // サンプル動画がある作品のみ（X上で再生させるため）
      if (!getSampleMovieUrl(v.item)) return false;
      return true;
    })
    .sort((a, b) => b[1].date.localeCompare(a[1].date));

  if (candidates.length === 0) {
    // 全件投稿済み or 動画なし → ランダム選択（動画ありの中から）
    const withVideo = Object.entries(store.items).filter(([, v]) =>
      getSampleMovieUrl(v.item),
    );
    if (withVideo.length === 0) return null;
    const [pid, v] = withVideo[Math.floor(Math.random() * withVideo.length)];
    return { productid: pid, item: v.item, tags: v.tags };
  }

  // 上位10件の中からランダム（毎回同じ順にならないように）
  const top = candidates.slice(0, 10);
  const [pid, v] = top[Math.floor(Math.random() * top.length)];
  return { productid: pid, item: v.item, tags: v.tags };
}

function buildTweetText(item: DugaItem, tags: string[]): string {
  const affiliate = getAffiliateLink(item);

  // タグラベルに変換、最大3つ
  const tagLabels = tags
    .map((slug) => TAG_BY_SLUG.get(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .slice(0, 3)
    .map((t) => `#${t.label}`)
    .join(" ");

  // タイトルは60字まで
  const title =
    item.title.length > 60 ? item.title.slice(0, 58) + "…" : item.title;

  const lines = [
    "🔥 今日の素人ピック",
    "",
    title,
    "",
    tagLabels,
    "",
    affiliate,
    "",
    "#PR #素人動画 #AV",
  ];
  return lines.join("\n");
}

async function downloadVideo(url: string): Promise<Buffer> {
  console.log(`downloading video: ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`video download failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  console.log(`downloaded ${(buf.length / 1024 / 1024).toFixed(2)} MB`);
  return buf;
}

async function main() {
  const appKey = process.env.X_API_KEY;
  const appSecret = process.env.X_API_SECRET;
  const accessToken = process.env.X_ACCESS_TOKEN;
  const accessSecret = process.env.X_ACCESS_SECRET;
  if (!appKey || !appSecret || !accessToken || !accessSecret) {
    throw new Error(
      "X_API_KEY / X_API_SECRET / X_ACCESS_TOKEN / X_ACCESS_SECRET を設定してください",
    );
  }

  const tags = await loadJson<TagsStore>(TAGS_PATH);
  const posted = await loadJson<PostedStore>(POSTED_PATH).catch(() => ({
    last_posted_at: null,
    productids: [],
  }));

  const postedSet = new Set(posted.productids);
  const pick = pickWork(tags, postedSet);
  if (!pick) {
    console.log("投稿可能な作品がありません（動画なし）");
    return;
  }
  console.log(`selected: ${pick.productid} - ${pick.item.title}`);

  const videoUrl = getSampleMovieUrl(pick.item);
  if (!videoUrl) throw new Error("video URL missing");

  const text = buildTweetText(pick.item, pick.tags);
  console.log(`\n=== tweet ===\n${text}\n============\n`);

  const client = new TwitterApi({ appKey, appSecret, accessToken, accessSecret });

  // 動画ダウンロード → X にアップロード → ツイート投稿
  const videoBuf = await downloadVideo(videoUrl);
  console.log("uploading to X...");
  const mediaId = await client.v1.uploadMedia(videoBuf, {
    mimeType: "video/mp4",
    target: "tweet",
    longVideo: false,
  });
  console.log(`media_id=${mediaId}`);

  console.log("posting tweet...");
  const result = await client.v2.tweet({
    text,
    media: { media_ids: [mediaId] },
  });
  console.log(`posted tweet_id=${result.data.id}`);

  // 投稿済みとして記録
  const updated: PostedStore = {
    last_posted_at: new Date().toISOString(),
    productids: [...posted.productids, pick.productid],
  };
  await mkdir(dirname(POSTED_PATH), { recursive: true });
  await writeFile(POSTED_PATH, JSON.stringify(updated, null, 2), "utf-8");
  console.log(`recorded. total posted=${updated.productids.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
