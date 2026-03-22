/**
 * Single source of truth for trip content: billy_big_adventure_tripdata.json
 *
 * - If billys_big_adventure.shell.html is missing, it is created once from
 *   billys_big_adventure_v2.html (embedded JSON replaced by __TRIPDATA_JSON__).
 * - Writes index.html and billys_big_adventure.html (same bytes) for file:// fallback and static hosts.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shellPath = path.join(__dirname, 'billys_big_adventure.shell.html');
const v2Path = path.join(__dirname, 'billys_big_adventure_v2.html');
const jsonPath = path.join(__dirname, 'billy_big_adventure_tripdata.json');
const outPaths = [
  path.join(__dirname, 'index.html'),
  path.join(__dirname, 'billys_big_adventure.html')
];
const PLACEHOLDER = '__TRIPDATA_JSON__';

let shell;
if (fs.existsSync(shellPath)) {
  shell = fs.readFileSync(shellPath, 'utf8');
} else if (fs.existsSync(v2Path)) {
  const v2 = fs.readFileSync(v2Path, 'utf8');
  const open = '<script id="embeddedTripData" type="application/json">';
  const start = v2.indexOf(open);
  if (start === -1) throw new Error('embeddedTripData script not found in v2');
  const jsonStart = start + open.length;
  const closeTag = v2.indexOf('</script>', jsonStart);
  if (closeTag === -1) throw new Error('closing </script> for embedded JSON not found');
  shell = v2.slice(0, jsonStart) + PLACEHOLDER + v2.slice(closeTag);
  fs.writeFileSync(shellPath, shell, 'utf8');
  console.error('Created', path.basename(shellPath), '(edit UI here; run this script after JSON changes)');
} else {
  throw new Error('Need billys_big_adventure.shell.html or billys_big_adventure_v2.html');
}

if (!shell.includes(PLACEHOLDER)) {
  throw new Error('Shell must contain ' + PLACEHOLDER);
}

const jsonRaw = fs.readFileSync(jsonPath, 'utf8');
JSON.parse(jsonRaw);

const html = shell.replace(PLACEHOLDER, jsonRaw.trimEnd());
for (const outPath of outPaths) {
  fs.writeFileSync(outPath, html, 'utf8');
  console.error('Wrote', path.basename(outPath));
}
