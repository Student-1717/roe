const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // URLs for Seed 73 to Seed 82
  const urls = [
    'https://example.com/seed73',
    'https://example.com/seed74',
    'https://example.com/seed75',
    'https://example.com/seed76',
    'https://example.com/seed77',
    'https://example.com/seed78',
    'https://example.com/seed79',
    'https://example.com/seed80',
    'https://example.com/seed81',
    'https://example.com/seed82'
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
