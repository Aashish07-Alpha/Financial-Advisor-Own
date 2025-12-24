const puppeteer = require('puppeteer');

async function scrapeSchemes() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    console.log("🌐 Opening schemes page...");

    await page.goto('https://www.india.gov.in/my-government/schemes-0', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // ✅ Wait for correct selector
    await page.waitForSelector('.views-infinite-scroll-content-wrapper', { timeout: 15000 });

    // Optional: scroll to bottom to trigger lazy loading
    await autoScroll(page);

    // Screenshot for debugging
    await page.screenshot({ path: 'schemes.png', fullPage: true });

    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll('.views-row');
      return Array.from(rows).map(row => {
        const title = row.querySelector('.field-content a')?.innerText.trim() || '';
        const desc = row.querySelector('.field-content .description')?.innerText.trim() || '';
        return { title, desc };
      });
    });

    console.log(`✅ Scraped ${data.length} schemes`);
    await browser.close();
    return data;

  } catch (error) {
    console.error("❌ Scraping error:", error);
    return [];
  }
}

// Helper to scroll to bottom to trigger lazy loading
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

module.exports = scrapeSchemes;
