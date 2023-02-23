const { Builder, By, Key, until, Browser } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const options = new chrome.Options();
const fs = require("fs");

(async function example() {
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options.headless())
    .build();
  try {
    await driver.get("https://www.google.com/ncr");
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);

    await driver.wait(until.titleIs("webdriver - Google Search"), 1000);

    let base64 = await driver.printPage({ pageRanges: ["1-2"] });
    await fs.writeFileSync("./test.pdf", base64, "base64");
  } finally {
    driver.quit();
  }
})();
