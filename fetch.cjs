const https = require('https');
https.get('https://snow-rider-3d.bitbucket.io/go/class-546.html', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<iframe[^>]+src=["']([^"']+)["']/i);
    console.log(match ? match[1] : 'No iframe found');
  });
});
