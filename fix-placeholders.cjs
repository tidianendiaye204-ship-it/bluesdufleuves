const fs = require('fs');
const content = fs.readFileSync('src/data/imagePlaceholders.ts', 'utf-8');
const lines = content.split('\n');
const seen = new Set();
const result = lines.filter(line => {
  if (line.trim().startsWith('"/')) {
    const key = line.split(':')[0].trim();
    if (seen.has(key)) return false;
    seen.add(key);
  }
  return true;
});
fs.writeFileSync('src/data/imagePlaceholders.ts', result.join('\n'));
