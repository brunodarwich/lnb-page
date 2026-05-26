const fs = require('fs');

const fileContent = fs.readFileSync('c:/Users/Bruno/Downloads/Lá na Brasília/lnb-app/src/data/merchantsData.ts', 'utf8');

const merchants = [];
let match;
// Extractor regex for merchants from ts file
const regex = /trade_name:\s*['"]([^'"]+)['"],\s*category:\s*['"]([^'"]+)['"],\s*sub_category:\s*['"]([^'"]+)['"],[\s\S]*?address_street:\s*['"]([^'"]+)['"],[\s\S]*?latitude:\s*(-?\d+\.\d+),\s*longitude:\s*(-?\d+\.\d+)/g;

while ((match = regex.exec(fileContent)) !== null) {
  merchants.push({
    name: match[1],
    category: match[2],
    subCategory: match[3],
    street: match[4],
    lat: parseFloat(match[5]),
    lng: parseFloat(match[6])
  });
}

const minLat = -3.20022;
const maxLat = -3.19105;
const minLng = -52.22034;
const maxLng = -52.20893;

const latSpan = maxLat - minLat;
const lngSpan = maxLng - minLng;

const formatted = merchants.map(m => {
  const x = ((m.lng - minLng) / lngSpan) * 100;
  const y = 100 - (((m.lat - minLat) / latSpan) * 100);
  return {
    n: m.name,
    c: m.category,
    s: m.subCategory,
    st: m.street,
    x: parseFloat(x.toFixed(1)),
    y: parseFloat(y.toFixed(1))
  };
}).filter(m => m.x >= 0 && m.x <= 100 && m.y >= 0 && m.y <= 100);

// Let's write the output as a javascript code block that can be directly pasted or loaded
const code = `const merchants = ${JSON.stringify(formatted)};`;
fs.writeFileSync('c:/Users/Bruno/Downloads/Lá na Brasília/lnb-page/assets/js/merchants_compressed.js', code);
console.log('Successfully written ' + formatted.length + ' merchants!');
