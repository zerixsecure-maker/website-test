// Pulls the latest LinkedIn posts from a Google Drive folder (Google Docs) and
// writes src/data/posts.json. Runs before every build. Never fails the build:
// if the key is missing or Drive is unreachable, the last committed file is kept.
import { writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs';

const KEY = process.env.GOOGLE_API_KEY;
const FOLDER = process.env.DRIVE_FOLDER_ID || '11qBQJxaVc1Kg1iEz9wlFAOShnTCUvfMT';
const MAX = Number(process.env.POSTS_MAX || 5);
const OUT = new URL('../src/data/posts.json', import.meta.url);
const IMG_DIR = new URL('../public/posts/', import.meta.url);

const clean = (raw) => {
  let t = raw.replace(/^﻿/, '').replace(/\r/g, '');
  t = t.replace(/hashtag\s*\\?\s*#/gi, '#').replace(/\\#/g, '#').replace(/\\([*_~`])/g, '$1');
  const lines = t.split('\n').map((l) => l.replace(/\s+$/g, ''));
  let link = '';
  const kept = lines.filter((l) => {
    const m = l.trim().match(/^(?:post link:|link:|url:)?\s*(https?:\/\/(?:www\.)?linkedin\.com\/\S+)$/i);
    if (m) { link = m[1]; return false; }
    return true;
  });
  const text = kept.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  return { text, link };
};

try {
  if (!KEY) throw new Error('GOOGLE_API_KEY not set');
  const q = encodeURIComponent(`'${FOLDER}' in parents and trashed=false and mimeType='application/vnd.google-apps.document'`);
  const list = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&orderBy=createdTime desc&pageSize=${MAX}&fields=files(id,name,createdTime,modifiedTime)&key=${KEY}`);
  if (!list.ok) throw new Error(`list ${list.status}`);
  const { files = [] } = await list.json();
  const posts = [];
  for (const f of files) {
    const r = await fetch(`https://www.googleapis.com/drive/v3/files/${f.id}/export?mimeType=text/plain&key=${KEY}`);
    if (!r.ok) continue;
    const { text, link } = clean(await r.text());
    // Google embeds pictures as base64 inside the HTML export: save the first one as a file.
    let image = '';
    try {
      const h = await fetch(`https://www.googleapis.com/drive/v3/files/${f.id}/export?mimeType=text/html&key=${KEY}`);
      if (h.ok) {
        const m = (await h.text()).match(/<img[^>]*src="data:image\/(png|jpe?g|webp|gif);base64,([A-Za-z0-9+\/=]+)"/i);
        if (m) {
          const ext = m[1].toLowerCase().replace('jpeg', 'jpg');
          mkdirSync(IMG_DIR, { recursive: true });
          writeFileSync(new URL(`${f.id}-1.${ext}`, IMG_DIR), Buffer.from(m[2], 'base64'));
          image = `/posts/${f.id}-1.${ext}`;
        }
      }
    } catch { /* text-only post */ }
    if (text) posts.push({ id: f.id, date: f.createdTime, text, link, image });
  }
  if (!posts.length) throw new Error('no posts found');
  writeFileSync(OUT, JSON.stringify(posts, null, 2) + '\n');
  // remove pictures of posts that are no longer in the feed
  const keep = new Set(posts.map((x) => x.image.split('/').pop()).filter(Boolean));
  if (existsSync(IMG_DIR)) for (const n of readdirSync(IMG_DIR)) if (/-\d\.(png|jpe?g|webp|gif)$/.test(n) && !keep.has(n)) unlinkSync(new URL(n, IMG_DIR));
  console.log(`[posts] fetched ${posts.length} post(s) from Drive`);
} catch (e) {
  console.warn(`[posts] using saved posts (${e.message})`);
  if (!existsSync(OUT)) writeFileSync(OUT, '[]\n');
}
