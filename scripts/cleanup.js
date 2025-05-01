#!/usr/bin/env node

/**
 * scripts/cleanup.js
 *
 * Scans your repo for:
 *  - Directories you almost always want to delete (node_modules, .next, dist, out, build)
 *  - Large files (>10 MB)
 *  - Empty directories
 *
 * Run with: `node scripts/cleanup.js`
 */

const fs = require('fs');
const path = require('path');

// directories you typically don’t commit
const IGNORED_DIRS = ['node_modules', '.next', 'dist', 'out', 'build', '.git'];
// size threshold, in bytes (here 10 MB)
const LARGE_FILE_THRESHOLD = 10 * 1024 * 1024;

const largeFiles = [];
const emptyDirs = [];
const unwantedDirs = [];

/**
 * Recursively walk a directory
 */
function walk(dir) {
  let entries;
  try { entries = fs.readdirSync(dir); }
  catch { return; }

  if (entries.length === 0) {
    emptyDirs.push(dir);
    return;
  }

  for (const name of entries) {
    const full = path.join(dir, name);
    const stat = fs.lstatSync(full);

    if (stat.isDirectory()) {
      if (IGNORED_DIRS.includes(name)) {
        unwantedDirs.push(full);
      } else {
        walk(full);
      }
    } else if (stat.isFile() && stat.size > LARGE_FILE_THRESHOLD) {
      largeFiles.push({ path: full, size: stat.size });
    }
  }
}

// Kick off scan from project root
walk(process.cwd());

// Report
console.log('\\n🗑️  Unwanted directories (you can safely delete these):');
unwantedDirs.forEach(d => console.log('  •', d));

console.log('\\n📂 Empty directories:');
emptyDirs.forEach(d => console.log('  •', d));

console.log('\\n🐘 Large files (>10 MB):');
largeFiles.forEach(f =>
  console.log(\`  • \${f.path} — \${(f.size / 1024 / 1024).toFixed(1)} MB\`)
);

console.log('\\nDone.');
