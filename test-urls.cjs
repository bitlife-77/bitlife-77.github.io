const https = require('https');

async function getIframeSrc(id) {
  return new Promise((resolve) => {
    https.get(`https://snow-rider-3d.bitbucket.io/go/class-${id}.html`, (res) => {
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
    }).on('error', () => resolve(null));
  });
}

(async () => {
  console.log('ID 19:', await getIframeSrc(19));
})();
