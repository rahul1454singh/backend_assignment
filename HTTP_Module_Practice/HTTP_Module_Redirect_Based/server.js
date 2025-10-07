const http = require('http');

const server = http.createServer((req, res) => {
  const currentHour = new Date().getHours(); // Get current server hour (0–23)

  if (req.url === '/time-check') {
    if (currentHour < 12) {
      // Before noon → redirect to /morning
      res.writeHead(302, { Location: '/morning' });
      res.end();
    } else {
      // Afternoon or later → redirect to /evening
      res.writeHead(302, { Location: '/evening' });
      res.end();
    }
  }

  // Morning route
  else if (req.url === '/morning') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Good morning! Have a great day ahead 🌞');
  }

  // Evening route
  else if (req.url === '/evening') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Good evening! Hope you had a wonderful day 🌙');
  }

  // Any other route → 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
