import fs from 'fs';
import path from 'path';
import { STATIC_PAGES } from './src/staticPages.js';

const SITE_URL = 'https://bitlife-77.github.io';
const games = JSON.parse(fs.readFileSync('public/games.json', 'utf8'));

const CAT_ICONS = {
  Action: '⚔️',
  Skill: '🎯',
  Running: '🏃',
  Adventure: '🗺️',
  Platform: '🟪',
  Car: '🚗',
  Racing: '🏁',
  Moto: '🏍️',
  '3D': '🧊',
  Shooting: '🔫',
  Multiplayer: '🌍',
  Puzzle: '🧩',
  Animal: '🐾',
  Simulation: '🕹️',
  Management: '📈',
  Survival: '🔥',
  Strategy: '♟️',
  Board: '🎲',
  Girls: '✨',
  '2 Player': '👥',
  Sports: '⚽',
  Popular: '⭐',
  New: '🆕',
  Stickman: '🕴️',
};

const CAT_DESC = {
  Action: 'high-octane action games packed with challenges and battles',
  Skill: 'skill-based challenges that test your reflexes, timing, and precision',
  Running: 'endless running adventures where speed and agility are key to survival',
  Adventure: 'exciting adventure quests full of exploration, story, and discovery',
  Platform: 'classic platformer gameplay with jumping, dodging, and collecting',
  Car: 'thrilling car games with fast driving, parking challenges, and stunts',
  Racing: 'high-speed racing competitions across tracks, roads, and off-road terrain',
  Moto: 'adrenaline-pumping motorcycle racing and stunt games',
  '3D': '3D browser games with immersive graphics and gameplay depth',
  Shooting: 'action-packed shooting games with weapons, enemies, and strategy',
  Multiplayer: 'multiplayer games you can enjoy with friends or compete globally',
  Puzzle: 'brain-teasing puzzle challenges that train logic and problem-solving',
  Animal: 'fun animal-themed games featuring pets, wildlife, and cute creatures',
  Simulation: 'realistic simulation experiences from city-building to life sims',
  Management: 'management and strategy games where you build, plan, and optimize',
  Survival: 'intense survival games where every decision keeps you alive',
  Strategy: 'deep strategy games combining planning, tactics, and decision-making',
  Board: 'classic board games reimagined in the browser for instant fun',
  Girls: 'fun and creative games designed for everyone who loves style and creativity',
  '2 Player': 'two-player games perfect for competing or cooperating with a friend',
  Sports: 'sports action games covering football, basketball, tennis, and more',
  Popular: 'the most-played and trending unblocked games loved by millions',
  New: 'the newest HTML5 games freshly added to the collection',
  Stickman: 'hilarious and action-packed stickman fighting and adventure games',
};

const CATEGORIES = [
  { id: 'all', emoji: '🎮', label: 'All Games' },
  { id: 'Popular', emoji: '⭐', label: 'Popular' },
  { id: 'Action', emoji: '⚔️', label: 'Action' },
  { id: 'New', emoji: '🆕', label: 'New' },
  { id: 'Skill', emoji: '🎯', label: 'Skill' },
  { id: 'Running', emoji: '🏃', label: 'Running' },
  { id: 'Adventure', emoji: '🗺️', label: 'Adventure' },
  { id: 'Platform', emoji: '🟪', label: 'Platform' },
  { id: 'Car', emoji: '🚗', label: 'Car' },
  { id: 'Racing', emoji: '🏁', label: 'Racing' },
  { id: 'Moto', emoji: '🏍️', label: 'Moto' },
  { id: '3D', emoji: '🧊', label: '3D' },
  { id: 'Shooting', emoji: '🔫', label: 'Shooting' },
  { id: 'Multiplayer', emoji: '🌍', label: 'Multiplayer' },
  { id: '2 Player', emoji: '👥', label: '2 Player' },
  { id: 'Sports', emoji: '⚽', label: 'Sports' },
  { id: 'Puzzle', emoji: '🧩', label: 'Puzzle' },
  { id: 'Animal', emoji: '🐾', label: 'Animal' },
  { id: 'Stickman', emoji: '🕴️', label: 'Stickman' },
  { id: 'Simulation', emoji: '🕹️', label: 'Simulation' },
  { id: 'Management', emoji: '📈', label: 'Management' },
  { id: 'Survival', emoji: '🔥', label: 'Survival' },
  { id: 'Strategy', emoji: '♟️', label: 'Strategy' },
  { id: 'Board', emoji: '🎲', label: 'Board' },
  { id: 'Girls', emoji: '✨', label: 'Girls' },
];

function createSlug(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getThumbUrl(game) {
  const img = game.thumb || game.icon;
  if (img) {
    return img.startsWith('/') ? img : `/${img}`;
  }
  return `/img/${game.id}.webp`;
}

function getCategoryCount(categoryId) {
  if (categoryId === 'all') return games.length;
  return games.filter(game => {
    const cats = Array.isArray(game.cat) ? game.cat : [game.cat];
    return cats.includes(categoryId);
  }).length;
}

function buildSidebar(activeCategory) {
  const links = CATEGORIES.map(category => {
    const count = getCategoryCount(category.id);
    if (count === 0 && category.id !== 'all') return '';
    const href = category.id === 'all' ? '/all-games.html' : '/all-games.html';
    const active = activeCategory === category.id ? 'active' : '';
    return `
      <a class="cat-item ${active}" href="${href}">
        <span class="cat-icon">${category.emoji}</span>
        <span>${escapeHtml(category.label)}</span>
        <span class="cat-count">${count}</span>
      </a>`;
  }).join('');

  return `
    <aside class="sidebar" id="sidebar" role="navigation" aria-label="Game categories">
      <div class="sidebar-section-label">Categories</div>
      ${links}
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>`;
}

function buildGameSeoContent(game, cats) {
  const primaryCat = cats[0] || 'Action';
  const catDescText = CAT_DESC[primaryCat] || 'fun browser games you can play anywhere';
  const catTags = cats.map(cat => `<span class="game-fact-tag">${escapeHtml(CAT_ICONS[cat] || '🎮')} ${escapeHtml(cat)}</span>`).join('');
  const safeTitle = escapeHtml(game.title);
  const safeCats = escapeHtml(cats.join(' / '));

  return `
  <section class="game-seo-wrap">
    <div class="game-seo-card">
      <div class="game-seo-card-header">
        <span class="game-seo-icon">🎮</span>
        <h2>About ${safeTitle}</h2>
      </div>
      <p><strong>${safeTitle}</strong> is a free unblocked ${escapeHtml(primaryCat.toLowerCase())} game available on <strong>BitLife 77</strong>. It belongs to the genre of ${escapeHtml(catDescText)}.</p>
      <p>Play <strong>${safeTitle} unblocked</strong> directly in your browser with no downloads, no installations, and no registrations required on desktop or mobile.</p>
      <div class="game-facts-row">
        <div class="game-fact-item">
          <span class="game-fact-label">🏷️ Genre</span>
          <div class="game-fact-tags">${catTags}</div>
        </div>
        <div class="game-fact-item">
          <span class="game-fact-label">🖥️ Platform</span>
          <div class="game-fact-tags"><span class="game-fact-tag">🌐 Browser (HTML5)</span><span class="game-fact-tag">📱 Mobile</span></div>
        </div>
        <div class="game-fact-item">
          <span class="game-fact-label">💰 Price</span>
          <div class="game-fact-tags"><span class="game-fact-tag free-tag">✓ 100% Free</span></div>
        </div>
        <div class="game-fact-item">
          <span class="game-fact-label">🔓 Access</span>
          <div class="game-fact-tags"><span class="game-fact-tag">⚡ No Login</span><span class="game-fact-tag">⚡ No Download</span></div>
        </div>
      </div>
    </div>

    <div class="game-seo-card">
      <div class="game-seo-card-header">
        <span class="game-seo-icon">📚</span>
        <h2>How to Play ${safeTitle}</h2>
      </div>
      <p>Press play and the game loads instantly in your browser. Use keyboard, mouse, or touch controls depending on the device and the game.</p>
      <div class="howto-steps">
        <div class="howto-step"><span class="howto-num">1</span><div><strong>Open the Game</strong><br>Start the game in the frame above with no download needed.</div></div>
        <div class="howto-step"><span class="howto-num">2</span><div><strong>Learn the Controls</strong><br>Use <kbd>Arrow Keys</kbd>, <kbd>WASD</kbd>, mouse, or touch controls depending on the title.</div></div>
        <div class="howto-step"><span class="howto-num">3</span><div><strong>Play &amp; Improve</strong><br>Beat your best score, finish more levels, or unlock better results over time.</div></div>
        <div class="howto-step"><span class="howto-num">4</span><div><strong>Go Fullscreen</strong><br>Use the fullscreen button above for the best experience.</div></div>
      </div>
    </div>

    <div class="game-seo-card">
      <div class="game-seo-card-header">
        <span class="game-seo-icon">❓</span>
        <h2>Frequently Asked Questions</h2>
      </div>
      <div class="faq-list">
        <details class="faq-item">
          <summary>Is ${safeTitle} free to play?</summary>
          <p>Yes. <strong>${safeTitle}</strong> is completely free to play on BitLife 77.</p>
        </details>
        <details class="faq-item">
          <summary>Can I play ${safeTitle} at school or work?</summary>
          <p>Yes. This page is designed to let you launch <strong>${safeTitle} unblocked</strong> directly from the browser.</p>
        </details>
        <details class="faq-item">
          <summary>Does ${safeTitle} work on mobile?</summary>
          <p>Yes. Most HTML5 games on this site work on phones and tablets as well as desktop browsers.</p>
        </details>
        <details class="faq-item">
          <summary>What category is ${safeTitle}?</summary>
          <p><strong>${safeTitle}</strong> is listed under <strong>${safeCats}</strong>.</p>
        </details>
      </div>
    </div>
  </section>`;
}

function generateAllGamesIndex(allGames) {
  const items = allGames.map(game => {
    const slug = createSlug(game.title);
    const categories = Array.isArray(game.cat) ? game.cat.join(', ') : game.cat;
    const thumbUrl = getThumbUrl(game);
    return `        <li class="game-card-wrap">
          <a class="game-link" href="/game/${slug}.html">
            <img src="${thumbUrl}" alt="${escapeHtml(game.title)}" loading="lazy" decoding="async">
            <strong>${escapeHtml(game.title)}</strong>
            <span>${escapeHtml(categories)}</span>
          </a>
        </li>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>All Games - BitLife 77 | 440+ Free Unblocked Games Directory</title>
  <meta name="description" content="Browse all 440+ static HTML game pages on BitLife 77 (https://bitlife-77.github.io/). Play unblocked games online for free.">
  <meta name="robots" content="index, follow">
  <meta name="author" content="BitLife 77">
  <link rel="canonical" href="${SITE_URL}/all-games.html">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE_URL}/all-games.html">
  <meta property="og:title" content="All Games - BitLife 77 | 440+ Free Games Directory">
  <meta property="og:description" content="Browse all 440+ free unblocked HTML5 games available on BitLife 77.">
  <meta property="og:site_name" content="BitLife 77">
  <meta name="theme-color" content="#7c3aed">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>">
  <style>
    :root {
      --bg:#08051a; --bg2:#0d0a26; --bg3:#12103a; --surface:rgba(255,255,255,0.04); --surface2:rgba(255,255,255,0.08);
      --border:rgba(255,255,255,0.08); --border2:rgba(139,92,246,0.25); --purple:#8b5cf6; --purple2:#7c3aed; --purple3:#6d28d9;
      --cyan:#06b6d4; --text:#f1f0f9; --text2:#a89dc9; --text3:#6b6490; --radius:12px; --radius-lg:18px; --radius-xl:24px;
      --shadow:0 8px 32px rgba(0,0,0,0.4);
      --font:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
    }
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:var(--font); background:var(--bg); color:var(--text); line-height:1.6; }
    a { color:inherit; text-decoration:none; }
    .top-header {
      position:fixed; top:0; left:0; right:0; height:56px; background:rgba(8,5,26,0.95);
      backdrop-filter:blur(12px); border-bottom:1px solid var(--border); display:flex; align-items:center;
      justify-content:space-between; padding:0 20px; z-index:100;
    }
    .header-logo-wrap { display:flex; align-items:center; gap:12px; }
    .header-logo { font-size:1.25rem; font-weight:800; color:#fff; display:flex; align-items:center; gap:3px; }
    .header-logo .gplus { color:var(--purple); }
    .header-links { display:flex; align-items:center; gap:16px; }
    .header-links a { color:var(--text2); font-size:0.875rem; font-weight:500; transition:color 0.2s; }
    .header-links a:hover { color:#fff; }
    .layout { display:flex; min-height:100vh; }
    .sidebar {
      width:220px; position:fixed; top:56px; bottom:0; left:0; background:rgba(8,5,26,0.98);
      border-right:1px solid var(--border); overflow-y:auto; padding:12px 8px; z-index:90;
    }
    .sidebar-section-label { font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--text3); padding:8px 12px 4px; }
    .cat-item { display:flex; align-items:center; gap:10px; padding:8px 12px; border-radius:8px; color:var(--text2); font-size:0.875rem; font-weight:500; transition:all 0.15s ease; }
    .cat-item:hover { background:var(--surface2); color:var(--text); transform:translateX(3px); }
    .cat-item.active { background:linear-gradient(135deg, rgba(139,92,246,0.25), rgba(124,58,237,0.15)); border:1px solid var(--border2); color:#fff; }
    .cat-icon { font-size:1.1rem; width:22px; text-align:center; }
    .cat-count { margin-left:auto; font-size:0.72rem; color:var(--text3); background:var(--surface); padding:2px 6px; border-radius:999px; }
    .sidebar-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:150; backdrop-filter:blur(2px); }
    .sidebar-overlay.open { display:block; }
    .main-content { margin-left:220px; margin-top:56px; padding:24px 20px 48px; flex:1; min-width:0; }
    .shell { max-width:1240px; margin:0 auto; }
    .btn-menu {
      display:none; align-items:center; justify-content:center; width:36px; height:36px; background:var(--surface2); border:1px solid var(--border);
      border-radius:8px; color:var(--text); font-size:18px; flex-shrink:0; cursor:pointer;
    }
    .page-title { font-size:1.75rem; font-weight:800; color:#fff; margin-bottom:8px; }
    .page-subtitle { color:var(--text2); margin-bottom:24px; font-size:0.95rem; }
    ul.games-grid { list-style:none; display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:16px; margin-bottom:40px; }
    li.game-card-wrap { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; transition:transform 0.2s, border-color 0.2s; }
    li.game-card-wrap:hover { transform:translateY(-3px); border-color:var(--purple); }
    .game-link { display:block; }
    .game-link img { width:100%; aspect-ratio:16/10; object-fit:cover; display:block; background:#120d2a; }
    .game-link strong { display:block; font-size:0.95rem; font-weight:600; padding:10px 12px 4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .game-link span { display:block; color:var(--text3); font-size:0.8rem; padding:0 12px 10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .site-footer {
      border-top:1px solid var(--border); padding:32px 0; margin-top:40px; color:var(--text3);
      font-size:0.875rem; text-align:center;
    }
    .footer-links { display:flex; justify-content:center; gap:20px; flex-wrap:wrap; margin-bottom:12px; }
    .footer-links a { color:var(--text2); transition:color 0.2s; }
    .footer-links a:hover { color:var(--purple); }
    @media (max-width:768px) {
      .btn-menu { display:flex; }
      .sidebar { transform:translateX(-100%); transition:transform 0.3s ease; }
      .sidebar.open { transform:translateX(0); }
      .main-content { margin-left:0; padding:16px 12px 36px; }
      .header-links { display:none; }
      ul.games-grid { grid-template-columns:repeat(2, minmax(0, 1fr)); gap:10px; }
    }
  </style>
</head>
<body>
  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  <header class="top-header">
    <div class="header-logo-wrap">
      <button class="btn-menu" id="btn-menu" type="button" aria-label="Open categories">☰</button>
      <a href="/" class="header-logo">BitLife<span class="gplus"> 77</span></a>
    </div>
    <nav class="header-links">
      <a href="/">Home</a>
      <a href="/all-games.html">All Games</a>
    </nav>
  </header>

  <div class="layout">
    ${buildSidebar('all')}
    <main class="main-content">
      <div class="shell">
        <h1 class="page-title">🎮 All BitLife 77 Games</h1>
        <p class="page-subtitle">Complete static directory of 440+ free unblocked HTML5 games available on BitLife 77.</p>
        <ul class="games-grid">
${items}
        </ul>
        <footer class="site-footer">
          <div class="footer-links">
            <a href="/">Home</a>
            <a href="/?page=about">About Us</a>
            <a href="/?page=contact">Contact</a>
            <a href="/?page=dmca">DMCA</a>
            <a href="/?page=tos">Terms of Service</a>
            <a href="/?page=privacy">Privacy Policy</a>
            <a href="/all-games.html">All Games</a>
          </div>
          <div>&copy; ${new Date().getFullYear()} BitLife 77. All rights reserved.</div>
        </footer>
      </div>
    </main>
  </div>

  <script>
    (function () {
      var menu = document.getElementById('btn-menu');
      var sidebar = document.getElementById('sidebar');
      var overlay = document.getElementById('sidebar-overlay');
      if (menu && sidebar && overlay) {
        menu.addEventListener('click', function () {
          sidebar.classList.toggle('open');
          overlay.classList.toggle('open');
        });
        overlay.addEventListener('click', function () {
          sidebar.classList.remove('open');
          overlay.classList.remove('open');
        });
      }
    })();
  </script>
</body>
</html>`;
}

function generateGamePage(game, allGames) {
  const slug = createSlug(game.title);
  const cats = Array.isArray(game.cat) ? game.cat : [game.cat];
  const categories = cats.join(', ');
  const primaryCat = cats[0] || 'Popular';
  const title = `Play ${game.title} Unblocked | BitLife 77`;
  const description = `Play ${game.title} unblocked free online on BitLife 77. No download, no login. Free ${primaryCat} HTML5 game that works on desktop and mobile.`;
  const url = `${SITE_URL}/game/${slug}.html`;
  const gameUrl = game.gameUrl;
  const thumbUrl = getThumbUrl(game);
  const safeTitle = escapeHtml(game.title);
  const related = allGames
    .filter(item => item.id !== game.id && ((Array.isArray(item.cat) ? item.cat : [item.cat]).includes(primaryCat)))
    .slice(0, 12);
  const relatedCards = related.map(item => {
    const itemSlug = createSlug(item.title);
    return `
                <a class="game-card game-card-link mini" href="/game/${itemSlug}.html" aria-label="Play ${escapeHtml(item.title)} unblocked">
                  <div class="card-thumb">
                    <img src="${escapeHtml(getThumbUrl(item))}" alt="${escapeHtml(item.title)} unblocked" loading="lazy" decoding="async">
                    <div class="card-overlay"><span class="btn-play">▶ Play</span></div>
                  </div>
                  <div class="card-info"><div class="card-title">${escapeHtml(item.title)}</div></div>
                </a>`;
  }).join('');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: game.title,
    description,
    url,
    image: thumbUrl,
    genre: categories,
    publisher: {
      '@type': 'Organization',
      name: 'BitLife 77',
    },
    playMode: 'SinglePlayer',
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="keywords" content="${escapeHtml(`bitlife 77, unblocked games, ${game.title.toLowerCase()}, ${categories.toLowerCase()}, free online games, no download games`)}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="BitLife 77">
  <link rel="canonical" href="${escapeHtml(url)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(thumbUrl)}">
  <meta property="og:site_name" content="BitLife 77">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#7c3aed">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>">
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
  <style>
    :root {
      --bg:#08051a; --bg2:#0d0a26; --bg3:#12103a; --surface:rgba(255,255,255,0.04); --surface2:rgba(255,255,255,0.08);
      --border:rgba(255,255,255,0.08); --border2:rgba(139,92,246,0.25); --purple:#8b5cf6; --purple2:#7c3aed; --purple3:#6d28d9;
      --cyan:#06b6d4; --text:#f1f0f9; --text2:#a89dc9; --text3:#6b6490; --radius:12px; --radius-lg:18px; --radius-xl:24px;
      --shadow:0 4px 24px rgba(0,0,0,0.4); --glow:0 0 24px rgba(139,92,246,0.3); --glow2:0 0 40px rgba(139,92,246,0.5);
    }
    * { box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { margin:0; font-family:system-ui,sans-serif; background:var(--bg); color:var(--text); }
    a { color:inherit; text-decoration:none; }
    img { display:block; max-width:100%; }
    button { font:inherit; }
    .top-header {
      position:fixed; top:0; left:0; right:0; z-index:200; height:56px; display:flex; align-items:center; justify-content:space-between; gap:16px;
      padding:0 20px; background:rgba(8,5,26,0.85); backdrop-filter:blur(12px); border-bottom:1px solid rgba(255,255,255,0.04);
    }
    .header-logo-wrap { display:flex; align-items:center; gap:12px; flex:1; }
    .header-logo { font-size:1.25rem; font-weight:800; letter-spacing:-0.5px; }
    .header-logo .g { color:var(--purple); }
    .header-logo .gplus { color:var(--cyan); font-size:0.85em; font-weight:900; margin-left:2px; }
    .header-links { display:flex; align-items:center; gap:14px; font-size:0.9rem; color:var(--text2); }
    .header-links a:hover { color:var(--text); }
    .layout { display:flex; min-height:100vh; }
    .sidebar {
      position:fixed; top:56px; left:0; bottom:0; width:220px; background:var(--bg2); border-right:1px solid var(--border);
      overflow-y:auto; overflow-x:hidden; z-index:100; padding:12px 8px 24px; scrollbar-width:thin; scrollbar-color:var(--border) transparent;
    }
    .sidebar::-webkit-scrollbar { width:4px; }
    .sidebar::-webkit-scrollbar-thumb { background:var(--border); border-radius:2px; }
    .sidebar-section-label {
      font-size:0.65rem; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:var(--text3); padding:10px 12px 4px;
    }
    .cat-item {
      display:flex; align-items:center; gap:10px; width:100%; padding:9px 12px; border-radius:10px; font-size:0.875rem; font-weight:500;
      color:var(--text2); transition:background 0.15s, color 0.15s; text-align:left;
    }
    .cat-item:hover { background:var(--surface2); color:var(--text); }
    .cat-item.active {
      background:linear-gradient(135deg, rgba(139,92,246,0.25), rgba(109,40,217,0.15)); color:var(--purple); border:1px solid var(--border2);
    }
    .cat-icon { font-size:1rem; min-width:22px; text-align:center; }
    .cat-count { margin-left:auto; font-size:0.7rem; color:var(--text3); background:var(--surface2); padding:1px 6px; border-radius:999px; }
    .sidebar-overlay {
      display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:150; backdrop-filter:blur(2px);
    }
    .sidebar-overlay.open { display:block; }
    .main-content { margin-left:220px; margin-top:56px; padding:16px 16px 40px; flex:1; min-width:0; }
    .shell { max-width:1240px; margin:0 auto; }
    .play-page { display:flex; flex-direction:column; gap:0; }
    .btn-menu {
      display:none; align-items:center; justify-content:center; width:36px; height:36px; background:var(--surface2); border:1px solid var(--border);
      border-radius:8px; color:var(--text); font-size:18px; flex-shrink:0; cursor:pointer;
    }
    .play-header {
      display:flex; align-items:center; gap:12px; padding:14px 20px; background:linear-gradient(to right, var(--bg2), var(--bg3));
      border:1px solid var(--border); border-radius:var(--radius-lg); margin-bottom:12px; flex-wrap:wrap;
    }
    .btn-back {
      display:flex; align-items:center; gap:6px; padding:7px 14px; background:var(--surface2); border:1px solid var(--border);
      border-radius:999px; color:var(--text2); font-size:0.875rem; font-weight:500; white-space:nowrap;
    }
    .btn-back:hover { color:var(--text); border-color:var(--purple); }
    .play-info { flex:1; min-width:0; }
    .play-game-title {
      margin:0; font-size:1.1rem; font-weight:700; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }
    .play-cats { display:flex; gap:6px; flex-wrap:wrap; margin-top:6px; }
    .play-cat-tag {
      font-size:0.7rem; padding:2px 8px; background:var(--surface); border:1px solid var(--border); border-radius:999px; color:var(--text3);
    }
    .btn-fullscreen {
      display:flex; align-items:center; gap:6px; padding:8px 16px; background:linear-gradient(135deg, var(--purple2), var(--purple3));
      color:#fff; border:0; border-radius:999px; font-size:0.875rem; font-weight:600; box-shadow:0 2px 12px rgba(124,58,237,0.4); white-space:nowrap;
      cursor:pointer;
    }
    .btn-fullscreen:hover { box-shadow:var(--glow2); transform:translateY(-1px); }
    .game-container {
      position:relative; width:100%; background:#000; border-radius:var(--radius-lg); overflow:hidden; border:1px solid var(--border);
      aspect-ratio:16/9; min-height:400px; max-height:620px;
    }
    .game-container iframe { position:absolute; inset:0; width:100%; height:100%; border:none; }
    .game-loading {
      position:absolute; inset:0; z-index:10; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; background:rgba(8,5,26,0.94);
      transition:opacity 0.25s ease, visibility 0.25s ease;
    }
    .game-loading.is-hidden {
      opacity:0; visibility:hidden; pointer-events:none;
    }
    .spinner {
      width:48px; height:48px; border:4px solid rgba(139,92,246,0.2); border-top-color:var(--purple); border-radius:50%; animation:spin 0.8s linear infinite;
    }
    .game-loading p { margin:0; color:var(--text2); font-size:0.95rem; }
    .game-loading strong { color:var(--purple); }
    .loading-note {
      font-size:0.82rem; color:var(--text3); text-align:center; max-width:320px; line-height:1.5;
    }
    .hero-thumb {
      margin:18px 0 0; display:flex; align-items:center; gap:16px; padding:14px; background:var(--surface); border:1px solid var(--border);
      border-radius:var(--radius-lg);
    }
    .hero-thumb img {
      width:132px; aspect-ratio:16/10; object-fit:cover; border-radius:12px; border:1px solid rgba(255,255,255,0.08); box-shadow:var(--shadow);
    }
    .hero-copy h2 { margin:0 0 8px; font-size:1rem; }
    .hero-copy p { margin:0; color:var(--text2); line-height:1.7; }
    .game-seo-wrap { margin-top:24px; display:flex; flex-direction:column; gap:18px; }
    .game-seo-card {
      background:linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.03)); border:1px solid var(--border); border-radius:var(--radius-xl);
      padding:22px 22px 20px; box-shadow:var(--shadow);
    }
    .game-seo-card-header { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
    .game-seo-card-header h2 { margin:0; font-size:1.05rem; }
    .game-seo-icon { font-size:1.2rem; }
    .game-seo-card p { margin:0 0 14px; color:var(--text2); line-height:1.75; }
    .game-facts-row { display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:14px; }
    .game-fact-item { padding:14px; background:var(--surface); border:1px solid var(--border); border-radius:14px; }
    .game-fact-label { display:block; margin-bottom:10px; font-size:0.8rem; color:var(--text3); }
    .game-fact-tags { display:flex; flex-wrap:wrap; gap:8px; }
    .game-fact-tag {
      display:inline-flex; align-items:center; gap:5px; padding:6px 10px; background:rgba(139,92,246,0.12); border:1px solid rgba(139,92,246,0.22);
      border-radius:999px; color:#ddd6fe; font-size:0.78rem;
    }
    .free-tag { color:#d1fae5; background:rgba(16,185,129,0.12); border-color:rgba(16,185,129,0.24); }
    .howto-steps { display:grid; gap:10px; }
    .howto-step {
      display:flex; gap:12px; padding:14px; background:var(--surface); border:1px solid var(--border); border-radius:14px; color:var(--text2); line-height:1.65;
    }
    .howto-step strong { color:var(--text); }
    .howto-num {
      display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; flex:0 0 30px; border-radius:999px; background:var(--purple); color:#fff; font-weight:700;
    }
    kbd {
      display:inline-block; padding:2px 6px; border-radius:6px; background:#15112f; border:1px solid rgba(255,255,255,0.08); color:#fff; font-size:0.78rem;
    }
    .faq-list { display:grid; gap:10px; }
    .faq-item {
      background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:14px 16px;
    }
    .faq-item summary { cursor:pointer; font-weight:600; color:var(--text); }
    .faq-item p { margin:10px 0 0; }
    .related-section { padding:24px 0 16px; margin-top:8px; border-top:1px solid var(--border); }
    .section-title { margin:0 0 14px; font-size:1rem; }
    .related-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(130px, 1fr)); gap:10px; }
    .game-card {
      background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; transition:transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s;
    }
    .game-card-link { display:block; color:inherit; text-decoration:none; }
    .game-card:hover { transform:translateY(-4px); border-color:var(--border2); box-shadow:var(--glow); }
    .card-thumb { position:relative; width:100%; aspect-ratio:16/10; overflow:hidden; background:var(--bg3); }
    .card-thumb img { width:100%; height:100%; object-fit:cover; transition:transform 0.3s ease; }
    .game-card:hover .card-thumb img { transform:scale(1.06); }
    .card-overlay {
      position:absolute; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 0.2s;
    }
    .game-card:hover .card-overlay { opacity:1; }
    .btn-play {
      background:var(--purple); color:#fff; font-size:0.8rem; font-weight:700; padding:7px 16px; border-radius:999px; box-shadow:0 2px 12px rgba(139,92,246,0.5);
    }
    .card-info { padding:8px 10px 10px; }
    .card-title {
      font-size:0.8rem; font-weight:600; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }
    .site-footer {
      margin-top:18px; padding:24px 0 10px; border-top:1px solid var(--border); color:var(--text3); text-align:center;
    }
    .footer-links { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-bottom:12px; }
    .footer-links a:hover { color:var(--text); }
    @keyframes spin { to { transform:rotate(360deg); } }
    @media (max-width: 780px) {
      .top-header { padding:0 12px; }
      .header-links { gap:10px; font-size:0.82rem; }
      .sidebar { width:190px; }
      .main-content { margin-left:190px; }
      .game-container { min-height:240px; }
      .hero-thumb { flex-direction:column; align-items:flex-start; }
      .hero-thumb img { width:100%; max-width:260px; }
      .game-facts-row { grid-template-columns:1fr; }
      .play-game-title { white-space:normal; }
    }
    @media (max-width: 560px) {
      .btn-menu { display:flex; }
      .sidebar { left:-240px; width:240px; transition:left 0.3s ease; z-index:300; }
      .sidebar.open { left:0; }
      .main-content { margin-left:0; padding:12px 12px 32px; }
      .play-header { padding:12px; }
      .btn-back, .btn-fullscreen { width:100%; justify-content:center; }
      .header-links { display:none; }
      .game-seo-card { padding:18px 16px; }
      .related-grid { grid-template-columns:repeat(2, minmax(0, 1fr)); }
    }
  </style>
</head>
<body>
  <header class="top-header">
    <div class="header-logo-wrap">
      <button class="btn-menu" id="btn-menu" type="button" aria-label="Open categories">☰</button>
      <a href="/" class="header-logo">BitLife<span class="gplus"> 77</span></a>
    </div>
    <nav class="header-links">
      <a href="/">Home</a>
      <a href="/all-games.html">All Games</a>
    </nav>
  </header>

  <div class="layout">
    ${buildSidebar(primaryCat)}
    <main class="main-content">
    <div class="shell">
      <div class="play-page">
      <div class="play-header">
        <a class="btn-back" href="/">← Back</a>
        <div class="play-info">
          <h1 class="play-game-title">Play ${safeTitle} Unblocked</h1>
          <div class="play-cats">
            ${cats.map(cat => `<span class="play-cat-tag">${escapeHtml(CAT_ICONS[cat] || '🎮')} ${escapeHtml(cat)}</span>`).join('')}
          </div>
        </div>
        <button class="btn-fullscreen" id="btn-fullscreen" type="button">⛶ Fullscreen</button>
      </div>

      <div class="game-container" id="game-container">
        <div class="game-loading" id="game-loading">
          <div class="spinner"></div>
          <p>Loading <strong>${safeTitle}</strong>...</p>
          <div class="loading-note">If the game server is slow, the loading screen will close automatically in a few seconds.</div>
        </div>
        <iframe
          id="game-frame"
          src="${escapeHtml(gameUrl)}"
          title="Play ${safeTitle} Unblocked | BitLife 77"
          allowfullscreen
          frameborder="0"
          allow="fullscreen; autoplay; encrypted-media; gamepad"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-top-navigation allow-modals"
        ></iframe>
      </div>

      <div class="hero-thumb">
        <img src="${escapeHtml(thumbUrl)}" alt="${safeTitle}" loading="lazy">
        <div class="hero-copy">
          <h2>${safeTitle}</h2>
          <p>${escapeHtml(description)}</p>
        </div>
      </div>

      ${buildGameSeoContent(game, cats)}

      ${related.length ? `
      <div class="related-section">
        <h2 class="section-title">🎮 More ${escapeHtml(primaryCat)} Unblocked Games</h2>
        <div class="related-grid">
${relatedCards}
        </div>
      </div>` : ''}
    </div>

    <footer class="site-footer">
      <div class="footer-links">
        <a href="/">Home</a>
        <a href="/?page=about">About Us</a>
        <a href="/?page=contact">Contact</a>
        <a href="/?page=dmca">DMCA</a>
        <a href="/?page=tos">Terms of Service</a>
        <a href="/?page=privacy">Privacy Policy</a>
        <a href="/all-games.html">All Games</a>
      </div>
      <div>&copy; ${new Date().getFullYear()} BitLife 77. All rights reserved.</div>
    </footer>
    </div>
    </main>
  </div>

  <script>
    (function () {
      var frame = document.getElementById('game-frame');
      var loading = document.getElementById('game-loading');
      var fullscreen = document.getElementById('btn-fullscreen');
      var container = document.getElementById('game-container');
      var menu = document.getElementById('btn-menu');
      var sidebar = document.getElementById('sidebar');
      var overlay = document.getElementById('sidebar-overlay');

      function hideLoading() {
        if (loading) {
          loading.classList.add('is-hidden');
        }
      }

      if (frame && loading) {
        frame.addEventListener('load', function () {
          hideLoading();
        });
        window.setTimeout(hideLoading, 3500);
      }

      if (fullscreen && container) {
        fullscreen.addEventListener('click', function () {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else if (container.requestFullscreen) {
            container.requestFullscreen();
          }
        });
      }

      if (menu && sidebar && overlay) {
        menu.addEventListener('click', function () {
          sidebar.classList.toggle('open');
          overlay.classList.toggle('open');
        });
        overlay.addEventListener('click', function () {
          sidebar.classList.remove('open');
          overlay.classList.remove('open');
        });
      }
    })();
  </script>
</body>
</html>`;
}

function generateStaticSubpage(id, page) {
  const title = `${page.title} - BitLife 77`;
  const description = `Read ${page.title} on BitLife 77 (https://bitlife-77.github.io/). Play 440+ free unblocked HTML5 browser games.`;
  const url = `${SITE_URL}/${id === 'tos' ? 'tos' : id}.html`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="BitLife 77">
  <link rel="canonical" href="${escapeHtml(url)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:site_name" content="BitLife 77">
  <meta name="theme-color" content="#7c3aed">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>">
  <style>
    :root {
      --bg:#08051a; --bg2:#0d0a26; --bg3:#12103a; --surface:rgba(255,255,255,0.04); --surface2:rgba(255,255,255,0.08);
      --border:rgba(255,255,255,0.08); --border2:rgba(139,92,246,0.25); --purple:#8b5cf6; --purple2:#7c3aed; --purple3:#6d28d9;
      --cyan:#06b6d4; --text:#f1f0f9; --text2:#a89dc9; --text3:#6b6490; --radius:12px; --radius-lg:18px; --radius-xl:24px;
      --shadow:0 8px 32px rgba(0,0,0,0.4);
      --font:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
    }
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:var(--font); background:var(--bg); color:var(--text); line-height:1.6; }
    a { color:inherit; text-decoration:none; }
    .top-header {
      position:fixed; top:0; left:0; right:0; height:56px; background:rgba(8,5,26,0.95);
      backdrop-filter:blur(12px); border-bottom:1px solid var(--border); display:flex; align-items:center;
      justify-content:space-between; padding:0 20px; z-index:100;
    }
    .header-logo-wrap { display:flex; align-items:center; gap:12px; }
    .header-logo { font-size:1.25rem; font-weight:800; color:#fff; display:flex; align-items:center; gap:3px; }
    .header-logo .gplus { color:var(--purple); }
    .header-links { display:flex; align-items:center; gap:16px; }
    .header-links a { color:var(--text2); font-size:0.875rem; font-weight:500; transition:color 0.2s; }
    .header-links a:hover { color:#fff; }
    .layout { display:flex; min-height:100vh; }
    .sidebar {
      width:220px; position:fixed; top:56px; bottom:0; left:0; background:rgba(8,5,26,0.98);
      border-right:1px solid var(--border); overflow-y:auto; padding:12px 8px; z-index:90;
    }
    .sidebar-section-label { font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--text3); padding:8px 12px 4px; }
    .cat-item { display:flex; align-items:center; gap:10px; padding:8px 12px; border-radius:8px; color:var(--text2); font-size:0.875rem; font-weight:500; transition:all 0.15s ease; }
    .cat-item:hover { background:var(--surface2); color:var(--text); transform:translateX(3px); }
    .cat-item.active { background:linear-gradient(135deg, rgba(139,92,246,0.25), rgba(124,58,237,0.15)); border:1px solid var(--border2); color:#fff; }
    .cat-icon { font-size:1.1rem; width:22px; text-align:center; }
    .cat-count { margin-left:auto; font-size:0.72rem; color:var(--text3); background:var(--surface); padding:2px 6px; border-radius:999px; }
    .sidebar-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:150; backdrop-filter:blur(2px); }
    .sidebar-overlay.open { display:block; }
    .main-content { margin-left:220px; margin-top:56px; padding:24px 20px 48px; flex:1; min-width:0; }
    .shell { max-width:960px; margin:0 auto; }
    .btn-menu {
      display:none; align-items:center; justify-content:center; width:36px; height:36px; background:var(--surface2); border:1px solid var(--border);
      border-radius:8px; color:var(--text); font-size:18px; flex-shrink:0; cursor:pointer;
    }
    .static-card {
      background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius-xl); padding:36px;
      box-shadow:var(--shadow); margin-bottom:32px;
    }
    .static-card h2 { color:var(--cyan); margin-top:0; margin-bottom:20px; font-size:1.8rem; }
    .static-card h3 { color:var(--purple); margin-top:24px; margin-bottom:12px; font-size:1.2rem; }
    .static-card p { color:var(--text2); line-height:1.75; margin-bottom:16px; font-size:0.95rem; }
    .static-card ul, .static-card ol { color:var(--text2); line-height:1.75; padding-left:24px; margin-bottom:20px; font-size:0.95rem; }
    .static-card li { margin-bottom:10px; }
    .static-card a { color:#c4b5fd; text-decoration:underline; text-underline-offset:3px; }
    .static-card a:hover { color:#fff; }
    .static-card code { background:var(--surface2); padding:2px 6px; border-radius:4px; color:var(--cyan); font-size:0.9em; }
    .site-footer {
      border-top:1px solid var(--border); padding:32px 0; margin-top:40px; color:var(--text3);
      font-size:0.875rem; text-align:center;
    }
    .footer-links { display:flex; justify-content:center; gap:20px; flex-wrap:wrap; margin-bottom:12px; }
    .footer-links a { color:var(--text2); transition:color 0.2s; }
    .footer-links a:hover { color:var(--purple); }
    @media (max-width:768px) {
      .btn-menu { display:flex; }
      .sidebar { transform:translateX(-100%); transition:transform 0.3s ease; }
      .sidebar.open { transform:translateX(0); }
      .main-content { margin-left:0; padding:16px 14px 36px; }
      .static-card { padding:22px 18px; }
      .header-links { display:none; }
    }
  </style>
</head>
<body>
  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  <header class="top-header">
    <div class="header-logo-wrap">
      <button class="btn-menu" id="btn-menu" type="button" aria-label="Open categories">☰</button>
      <a href="/" class="header-logo">BitLife<span class="gplus"> 77</span></a>
    </div>
    <nav class="header-links">
      <a href="/">Home</a>
      <a href="/all-games.html">All Games</a>
    </nav>
  </header>

  <div class="layout">
    ${buildSidebar('')}
    <main class="main-content">
      <div class="shell">
        <div class="static-card">
          ${page.content}
        </div>
        <footer class="site-footer">
          <div class="footer-links">
            <a href="/">Home</a>
            <a href="/?page=about">About Us</a>
            <a href="/?page=contact">Contact</a>
            <a href="/?page=dmca">DMCA</a>
            <a href="/?page=tos">Terms of Service</a>
            <a href="/?page=privacy">Privacy Policy</a>
            <a href="/all-games.html">All Games</a>
          </div>
          <div>&copy; ${new Date().getFullYear()} BitLife 77. All rights reserved.</div>
        </footer>
      </div>
    </main>
  </div>

  <script>
    (function () {
      var menu = document.getElementById('btn-menu');
      var sidebar = document.getElementById('sidebar');
      var overlay = document.getElementById('sidebar-overlay');
      if (menu && sidebar && overlay) {
        menu.addEventListener('click', function () {
          sidebar.classList.toggle('open');
          overlay.classList.toggle('open');
        });
        overlay.addEventListener('click', function () {
          sidebar.classList.remove('open');
          overlay.classList.remove('open');
        });
      }
    })();
  </script>
</body>
</html>`;
}

const gameDirs = ['public/game', 'game'];
gameDirs.forEach(gameDir => {
  if (fs.existsSync(gameDir)) {
    fs.rmSync(gameDir, { recursive: true, force: true });
  }
  fs.mkdirSync(gameDir, { recursive: true });
});

games.forEach(game => {
  const slug = createSlug(game.title);
  const fileName = `${slug}.html`;
  const html = generateGamePage(game, games);
  gameDirs.forEach(gameDir => {
    const filePath = path.join(gameDir, fileName);
    fs.writeFileSync(filePath, html, 'utf8');
  });
  console.log(`Generated: ${fileName}`);
});

const allGamesHtml = generateAllGamesIndex(games);
fs.writeFileSync(path.join('public', 'all-games.html'), allGamesHtml, 'utf8');
fs.writeFileSync('all-games.html', allGamesHtml, 'utf8');
console.log('Generated: all-games.html');

Object.entries(STATIC_PAGES).forEach(([id, page]) => {
  const pageHtml = generateStaticSubpage(id, page);
  const fileName = `${id}.html`;
  fs.writeFileSync(path.join('public', fileName), pageHtml, 'utf8');
  fs.writeFileSync(fileName, pageHtml, 'utf8');
  console.log(`Generated: ${fileName}`);
});

console.log(`Generated ${games.length} game pages and static subpages.`);
