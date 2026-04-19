const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/bg-\[\#0a0a0a\]/g, 'bg-dark-card');
  content = content.replace(/bg-\[\#030303\]/g, 'bg-dark-bg');
  content = content.replace(/bg-\[\#050505\]/g, 'bg-dark-bg');
  content = content.replace(/from-\[\#050505\]/g, 'from-dark-bg');
  content = content.replace(/from-\[\#0a0a0a\]/g, 'from-dark-card');
  content = content.replace(/bg-black/g, 'bg-dark-bg');
  content = content.replace(/text-white/g, 'text-gray-300'); // the requested text-main
  content = content.replace(/border-white\/(\d+)/g, 'border-gray-300/$1');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
