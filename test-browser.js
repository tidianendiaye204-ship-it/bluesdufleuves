import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('response', response => console.log('RESPONSE:', response.status(), response.url()));
  
  await page.goto('http://localhost:8081/formations', { waitUntil: 'networkidle0' });
  
  const content = await page.content();
  if (content.includes("Cette page n'a pas chargé")) {
    console.log("Error page is showing!");
  } else {
    console.log("Page looks fine.");
  }
  
  await browser.close();
})();
