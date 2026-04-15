import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = [
  path.join(root, 'index.html'),
  ...fs.readdirSync(path.join(root, 'views')).map((f) => path.join(root, 'views', f)),
].filter((p) => p.endsWith('.html'));

const issues = [];

for (const file of targets) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');

  const checks = [
    { ok: /id="site-header"/.test(html), msg: 'missing site-header host' },
    { ok: /id="site-footer"/.test(html), msg: 'missing site-footer host' },
    { ok: /layout-components\.js/.test(html), msg: 'missing layout-components script' },
    { ok: /property="og:title"/.test(html), msg: 'missing og:title meta' },
    { ok: !html.includes('`r`n'), msg: 'contains escaped newline artifact' },
    { ok: !/<\/main>\s*<\/main>/s.test(html), msg: 'contains duplicated closing </main>' },
  ];

  for (const check of checks) {
    if (!check.ok) issues.push(`${rel}: ${check.msg}`);
  }

  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  imgTags.forEach((imgTag, idx) => {
    if (!/\balt\s*=\s*"[^"]*"/i.test(imgTag)) {
      issues.push(`${rel}: img tag #${idx + 1} missing alt attribute`);
    }
  });
}

if (issues.length > 0) {
  console.error('QA check failed with issues:');
  issues.forEach((i) => console.error(`- ${i}`));
  process.exit(1);
}

console.log(`QA check passed for ${targets.length} HTML files.`);
