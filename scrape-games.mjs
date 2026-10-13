// scrape-games.mjs - Scrape all games from bitbucket site
// Usage: node scrape-games.mjs

const BASE = 'https://unblocked-games-g-plus.bitbucket.io';

const CATEGORIES = [
  { id: 'popular',    label: 'Popular' },
  { id: 'new',        label: 'New' },
  { id: 'running',    label: 'Running' },
  { id: '3d',         label: '3D' },
  { id: 'shooting',   label: 'Shooting' },
  { id: 'multiplayer',label: 'Multiplayer' },
  { id: 'racing',     label: 'Racing' },
  { id: 'moto',       label: 'Moto' },
  { id: 'stickman',   label: 'Stickman' },
  { id: 'adventure',  label: 'Adventure' },
  { id: 'puzzle',     label: 'Puzzle' },
  { id: 'animal',     label: 'Animal' },
  { id: 'platform',   label: 'Platform' },
  { id: 'simulation', label: 'Simulation' },
  { id: 'management', label: 'Management' },
  { id: 'survival',   label: 'Survival' },
  { id: 'strategy',   label: 'Strategy' },
  { id: 'board',      label: 'Board' },
  { id: 'girls',      label: 'Girls' },
  { id: '2-player',   label: '2 Player' },
  { id: 'car',        label: 'Car' },
  { id: 'sports',     label: 'Sports' },
  { id: 'skill',      label: 'Skill' },
];

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0' }
  });
  if (!res.ok) return '';
  return res.text();
}

function extractGames(html, catLabel) {
  const games = [];
  // Match game card links: /go/class-N.html or /play/class-N.html
  const linkRe = /href="([^"]*(?:\/go\/class-|\/play\/class-)(\d+)\.html[^"]*)"/g;
  const imgRe = /class-(\d+)\.webp/;
  
  // Parse cards: find anchor tags with class data
  // Pattern: <a href="...class-N...">...<img src="...class-N.webp">...<span or div title>...</a>
  const cardRe = /<a[^>]+href="[^"]*(?:\/go\/class-|\/play\/class-)(\d+)\.html[^"]*"[^>]*>([\s\S]*?)<\/a>/g;
  
  let match;
  const seen = new Set();
  
  while ((match = cardRe.exec(html)) !== null) {
    const classId = match[1];
    const inner = match[2];
    
    if (seen.has(classId)) continue;
    seen.add(classId);
    
    // Extract title from img alt, or various text elements
    let title = '';
    const altMatch = inner.match(/alt="([^"]+)"/);
    const titleMatch = inner.match(/title="([^"]+)"/);
    const h3Match = inner.match(/<h3[^>]*>([^<]+)<\/h3>/);
    const spanMatch = inner.match(/<span[^>]*class="[^"]*(?:title|name|label)[^"]*"[^>]*>([^<]+)<\/span>/);
    const pMatch = inner.match(/<p[^>]*>([^<]{3,60})<\/p>/);
    
    title = (altMatch && altMatch[1]) || (titleMatch && titleMatch[1]) || 
            (h3Match && h3Match[1]) || (spanMatch && spanMatch[1]) || 
            (pMatch && pMatch[1]) || '';
    title = title.replace(/\s+/g, ' ').trim();
    if (!title || title.length < 2) title = `Game ${classId}`;
    
    // Extract thumbnail
    let thumb = `${BASE}/images/games/class-${classId}.webp`;
    const imgSrcMatch = inner.match(/src="([^"]*class-\d+\.[^"]+)"/);
    if (imgSrcMatch) thumb = imgSrcMatch[1].startsWith('http') ? imgSrcMatch[1] : BASE + imgSrcMatch[1];
    
    games.push({ id: classId, title, cat: catLabel, thumb });
  }
  
  return games;
}

async function main() {
  console.log('🔍 Scraping games from Bitbucket UBG...\n');
  
  const allGames = new Map(); // id -> game
  const gameCategories = new Map(); // id -> Set of categories
  
  for (const cat of CATEGORIES) {
    const url = `${BASE}/category/${cat.id}.html`;
    console.log(`  Fetching: ${cat.label}...`);
    
    const html = await fetchPage(url);
    if (!html) {
      console.log(`    ⚠️  Failed to fetch ${url}`);
      continue;
    }
    
    const games = extractGames(html, cat.label);
    console.log(`    ✅ Found ${games.length} games`);
    
    for (const g of games) {
      if (!allGames.has(g.id)) {
        allGames.set(g.id, g);
        gameCategories.set(g.id, new Set([cat.label]));
      } else {
        gameCategories.get(g.id).add(cat.label);
      }
    }
    
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300));
  }
  
  // Build final array with all categories per game
  const result = [];
  for (const [id, game] of allGames) {
    const cats = [...gameCategories.get(id)];
    result.push({
      id,
      title: game.title,
      cat: cats,
      thumb: game.thumb,
      gameUrl: `https://splenedu52.github.io/g50/class-${id}/`,
      pageUrl: `${BASE}/go/class-${id}.html`
    });
  }
  
  // Sort by id numerically
  result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  
  console.log(`\n📊 Total unique games: ${result.length}`);
  console.log('\nSample of first 5 games:');
  result.slice(0, 5).forEach(g => console.log(`  [${g.id}] ${g.title} - [${g.cat.join(', ')}]`));
  
  // Write result to JSON
  const { writeFileSync } = await import('fs');
  writeFileSync('./src/games-bitbucket.json', JSON.stringify(result, null, 2));
  console.log('\n✅ Saved to src/games-bitbucket.json');
}

main().catch(console.error);
