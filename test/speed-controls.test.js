const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('offers slower, normal, and faster speed options', () => {
  for (const speed of ['0.5', '1', '2']) {
    assert.match(html, new RegExp(`data-speed="${speed}"`));
  }
});

test('uses the selected speed to scale automatic drops', () => {
  assert.match(html, /dropInterval\s*=\s*baseDropInterval\s*\/\s*speed/);
});

function test(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}
