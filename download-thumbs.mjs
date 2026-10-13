// download-thumbs.mjs - Download PNG thumbnails & convert to WebP
// URL: https://unblocked-games-g-plus.bitbucket.io/img/class-{id}.png
// Output: public/img/class-{id}.webp
// Usage: node download-thumbs.mjs

import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { readFileSync } from 'fs';
import sharp from 'sharp';

const games = JSON.parse(readFileSync('./src/games-bitbucket.json', 'utf-8'));
const OUT_DIR = './public/img';
const BASE_URL = 'https://unblocked-games-g-plus.bitbucket.io/img';
const CONCURRENCY = 10;

mkdirSync(OUT_DIR, { recursive: true });

async function downloadOne(id) {
  const outFile = `${OUT_DIR}/class-${id}.webp`;
  if (existsSync(outFile)) return { id, status: 'skipped' };

  const url = `${BASE_URL}/class-${id}.png`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return { id, status: `http-${res.status}` };

    const pngBuf = Buffer.from(await res.arrayBuffer());

    // Convert PNG → WebP (quality 82, resize to max 300px wide)
    const webpBuf = await sharp(pngBuf)
      .resize({ width: 300, height: 188, fit: 'cover', position: 'centre' })
      .webp({ quality: 82 })
      .toBuffer();

    writeFileSync(outFile, webpBuf);
    return { id, status: 'ok', kb: Math.round(webpBuf.byteLength / 1024) };
  } catch (e) {
    return { id, status: 'failed', err: e.message.slice(0, 60) };
  }
}

async function main() {
  console.log(`📥 Downloading & converting ${games.length} thumbnails → WebP\n`);

  let done = 0, ok = 0, skipped = 0, failed = 0;
  const failedIds = [];

  for (let i = 0; i < games.length; i += CONCURRENCY) {
    const batch = games.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(g => downloadOne(g.id)));

    for (const r of results) {
      done++;
      if (r.status === 'ok')       { ok++; }
      else if (r.status === 'skipped') { skipped++; }
      else { failed++; failedIds.push(r.id); }
    }

    const pct = Math.round((done / games.length) * 100);
    process.stdout.write(
      `\r  ${String(pct).padStart(3)}%  [${done}/${games.length}]  ✅ ${ok}  ⏭ ${skipped}  ❌ ${failed}   `
    );
    // Small delay to be polite to the server
    await new Promise(r => setTimeout(r, 150));
  }

  console.log('\n');
  console.log(`✅ Done!`);
  console.log(`   Downloaded & converted : ${ok}`);
  console.log(`   Skipped (exists)       : ${skipped}`);
  console.log(`   Failed                 : ${failed}`);
  if (failedIds.length > 0) {
    console.log(`   Failed IDs: ${failedIds.join(', ')}`);
  }
  console.log(`\n📁 Thumbnails saved to: ${OUT_DIR}/class-{{id}}.webp`);
}

main().catch(console.error);
