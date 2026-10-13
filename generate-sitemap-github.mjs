import fs from 'fs';
import path from 'path';

// URL Root
const baseUrl = 'https://bitlife-77.github.io';
const gamesJsonPath = path.resolve('public/games.json');

function getSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// 5 Core Categories Buckets
// We will distribute the games into these buckets.
const buckets = {
  'action': [],
  'racing': [],
  'shooting': [],
  'puzzle': [],
  'other': []
};

try {
  // 1. Baca data games.json
  const rawData = fs.readFileSync(gamesJsonPath, 'utf-8');
  const games = JSON.parse(rawData);

  // 2. Bagi ke dalam bucket kategori
  games.forEach(game => {
    const cats = Array.isArray(game.cat) ? game.cat : [game.cat];
    const catStr = cats.map(c => c.toLowerCase()).join(' ');

    if (catStr.includes('shoot') || catStr.includes('gun')) {
      buckets['shooting'].push(game);
    } else if (catStr.includes('racing') || catStr.includes('driving') || catStr.includes('moto')) {
      buckets['racing'].push(game);
    } else if (catStr.includes('puzzle') || catStr.includes('board') || catStr.includes('math')) {
      buckets['puzzle'].push(game);
    } else if (catStr.includes('action') || catStr.includes('fighting') || catStr.includes('adventure')) {
      buckets['action'].push(game);
    } else {
      buckets['other'].push(game);
    }
  });

  // 3. Helper untuk menulis sitemap XML
  const generateSitemapFile = (filename, gameList) => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    // Khusus sitemap pertama, isikan homepage URL
    if (filename === 'sitemap-action.xml') {
      xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
      xml += `  <url>\n    <loc>${baseUrl}/all-games.html</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
      xml += `  <url>\n    <loc>${baseUrl}/about.html</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
      xml += `  <url>\n    <loc>${baseUrl}/contact.html</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
      xml += `  <url>\n    <loc>${baseUrl}/dmca.html</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
      xml += `  <url>\n    <loc>${baseUrl}/tos.html</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
      xml += `  <url>\n    <loc>${baseUrl}/privacy.html</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }

    gameList.forEach(game => {
      // Sitemap should point to the static HTML game page.
      const slug = getSlug(game.title);
      const gameUrl = `${baseUrl}/game/${slug}.html`;
      const safeUrl = gameUrl.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      
      xml += `  <url>\n    <loc>${safeUrl}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    fs.writeFileSync(path.resolve(`public/${filename}`), xml);
    fs.writeFileSync(path.resolve(filename), xml);
    console.log(`✅ File ${filename} digenerate dengan ${gameList.length} URL.`);
  };

  // 4. Proses masing-masing bucket
  const sitemapFiles = [];
  for (const [bucketName, gameList] of Object.entries(buckets)) {
    if (gameList.length > 0) {
      const filename = `sitemap-${bucketName}.xml`;
      generateSitemapFile(filename, gameList);
      sitemapFiles.push(filename);
    }
  }

  // 5. Generate Sitemap Index (.xml induk)
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const today = new Date().toISOString().split('T')[0];

  sitemapFiles.forEach(file => {
    indexXml += `  <sitemap>\n    <loc>${baseUrl}/${file}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>\n`;
  });
  indexXml += `</sitemapindex>`;
  
  fs.writeFileSync(path.resolve('public/sitemap.xml'), indexXml);
  fs.writeFileSync(path.resolve('sitemap.xml'), indexXml);
  console.log(`✅ INDUK Sitemap Index (sitemap.xml) berhasil digenerate menunjuk ke ${sitemapFiles.length} file sitemap anakan!`);

} catch (error) {
  console.error("Gagal generate sitemap:", error.message);
}
