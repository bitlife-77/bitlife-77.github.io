const fs = require('fs');
const https = require('https');

const games = JSON.parse(fs.readFileSync('public/games.json', 'utf8'));

// Semaphores/concurrency limit
const CONCURRENCY = 30;
let currentIndex = 0;
let modifiedCount = 0;
let failedCount = 0;

function fetchUrl(game) {
  return new Promise((resolve) => {
    https.get(`https://snow-rider-3d.bitbucket.io/go/class-${game.id}.html`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<iframe[^>]+src=["']([^"']+)["']/i);
        if (match) {
           resolve(match[1]);
        } else {
           resolve(null);
        }
      });
    }).on('error', (err) => {
      resolve(null);
    });
  });
}

async function worker() {
  while (currentIndex < games.length) {
    const i = currentIndex++;
    const game = games[i];
    const iframeSrc = await fetchUrl(game);
    
    if (iframeSrc) {
      if (game.gameUrl !== iframeSrc) {
        game.gameUrl = iframeSrc;
        modifiedCount++;
      }
    } else {
      failedCount++;
      console.log(`Failed to fetch iframe for ID ${game.id}`);
    }
    
    if (currentIndex % 100 === 0) {
      console.log(`Progress: ${currentIndex}/${games.length}`);
    }
  }
}

async function start() {
  console.log('Starting fetch for', games.length, 'games...');
  const promises = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    promises.push(worker());
  }
  await Promise.all(promises);
  
  fs.writeFileSync('public/games.json', JSON.stringify(games, null, 2));
  console.log(`Done! Modified ${modifiedCount} games. Failed: ${failedCount}`);
}

start();
