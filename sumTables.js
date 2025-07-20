const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // URLs for Seed 73 to Seed 82
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=73',
    'https://sanand0.github.io/tdsdata/js_table/?seed=74',
    'https://sanand0.github.io/tdsdata/js_table/?seed=75',
    'https://sanand0.github.io/tdsdata/js_table/?seed=76',
    'https://sanand0.github.io/tdsdata/js_table/?seed=77',
    'https://sanand0.github.io/tdsdata/js_table/?seed=78',
    'https://sanand0.github.io/tdsdata/js_table/?seed=79',
    'https://sanand0.github.io/tdsdata/js_table/?seed=80',
    'https://sanand0.github.io/tdsdata/js_table/?seed=81',
    'https://sanand0.github.io/tdsdata/js_table/?seed=82'
  ];

  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url);

    // Extract all numbers from all tables on the page
    const numbers = await page.$$eval('table', tables => {
      // Collect all text from tables and extract numbers
      const nums = [];
      tables.forEach(table => {
        const cells = table.querySelectorAll('td, th');
        cells.forEach(cell => {
          const text = cell.textContent || '';
          const matches = text.match(/-?\d+(\.\d+)?/g);
          if (matches) {
            matches.forEach(num => nums.push(parseFloat(num)));
          }
        });
      });
      return nums;
    });

    const sum = numbers.reduce((acc, val) => acc + val, 0);
    console.log(`Sum for ${url}: ${sum}`);
    grandTotal += sum;
  }

  console.log(`Grand Total: ${grandTotal}`);

  await browser.close();
})();
