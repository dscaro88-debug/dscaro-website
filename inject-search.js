const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const injection = `  <!-- DS CARO Search -->
  <script src="search-data.js"></script>
  <script src="search.js"></script>
`;

let count = 0;
htmlFiles.forEach(file => {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');

  // Skip if already injected
  if (content.includes('search-data.js')) {
    console.log(`[SKIP] ${file} — already has search`);
    return;
  }

  // Inject before </body>
  if (content.includes('</body>')) {
    content = content.replace('</body>', injection + '</body>');
    fs.writeFileSync(fp, content, 'utf8');
    console.log(`[OK]   ${file}`);
    count++;
  } else {
    console.log(`[WARN] ${file} — no </body> tag found`);
  }
});

console.log(`\nDone: injected search into ${count}/${htmlFiles.length} files.`);
