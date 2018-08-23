const puppeteer = require('puppeteer');

const debugIsEnabled = () => (
  process.env.NODE_ENV !== 'debug' ? {} : {
    headless: false,
    devtools: true,
    slowMo: 250,
    // executablePath: string,  // path to chrome executable instead of using chromium
    // timeout: number,         // (30 seconds by default), 0 to disable timeout
    // ignoreHTTPSErrors: bool, // skip any https errors which may popup during tests
  });

describe('on page load', async () => {
  test('h1 loads correctly', async () => {
    let browser = await puppeteer.launch(debugIsEnabled());
    let page = await browser.newPage();

    await page.emulate({
      viewport: {
        width: 1024,
        height: 756,
      },
      userAgent: '',
    });

    await page.goto('http://127.0.0.1:1234');

    const innerHTML = await page
      .$eval('.container > h1', e => e.innerHTML);

    expect(innerHTML).toBe('Hello, puppeteer!');

    await browser.close();
  }, 16000);
});
