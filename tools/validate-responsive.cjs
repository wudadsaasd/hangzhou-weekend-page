const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const url = process.env.SITE_URL || "http://127.0.0.1:4173/";
const out = path.resolve("validation");
fs.mkdirSync(out, { recursive: true });

const checks = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 1000 },
];

async function collectMetrics(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const h1 = document.querySelector("h1");
    const h2 = document.querySelector(".section-heading h2");
    const nav = document.querySelector(".floating-nav");
    const h1Style = h1 ? getComputedStyle(h1) : null;
    const h2Style = h2 ? getComputedStyle(h2) : null;
    const navBox = nav ? nav.getBoundingClientRect() : null;
    const overflowNodes = [...document.querySelectorAll("body *")]
      .filter((el) => {
        const box = el.getBoundingClientRect();
        return box.width > 0 && (box.right > window.innerWidth + 2 || box.left < -2);
      })
      .slice(0, 8)
      .map((el) => {
        const box = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: String(el.className),
          text: (el.textContent || "").trim().slice(0, 50),
          left: Math.round(box.left),
          right: Math.round(box.right),
        };
      });

    return {
      title: document.title,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      bodyScrollWidth: body.scrollWidth,
      h1FontSize: h1Style ? h1Style.fontSize : null,
      h2FontSize: h2Style ? h2Style.fontSize : null,
      navWidth: navBox ? Math.round(navBox.width) : null,
      overflowNodes,
    };
  });
}

(async () => {
  const browser = await chromium.launch();
  const results = [];

  for (const cfg of checks) {
    const page = await browser.newPage({
      viewport: { width: cfg.width, height: cfg.height },
      deviceScaleFactor: cfg.name === "mobile" ? 2 : 1,
    });
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto(url, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(out, `${cfg.name}-top.png`), fullPage: false });
    await page.evaluate(async () => {
      const height = document.documentElement.scrollHeight;
      const steps = 8;
      for (let i = 0; i <= steps; i += 1) {
        window.scrollTo(0, (height / steps) * i);
        await new Promise((resolve) => setTimeout(resolve, 180));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 180));
    });
    await page.screenshot({ path: path.join(out, `${cfg.name}-full.png`), fullPage: true });
    await page.click('[data-day="day2"]');

    results.push({
      name: cfg.name,
      errors,
      metrics: await collectMetrics(page),
      day2Visible: await page.locator("#day2").isVisible(),
    });

    await page.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(out, "report.json"), JSON.stringify(results, null, 2), "utf8");
  console.log(JSON.stringify(results, null, 2));

  const failures = results.filter((result) => {
    const mobileH1TooLarge =
      result.name === "mobile" && parseFloat(result.metrics.h1FontSize || "0") > 66;
    const mobileH2TooLarge =
      result.name === "mobile" && parseFloat(result.metrics.h2FontSize || "0") > 50;
    const hasOverflow = result.metrics.scrollWidth > result.metrics.clientWidth + 2;
    return (
      result.errors.length > 0 ||
      hasOverflow ||
      mobileH1TooLarge ||
      mobileH2TooLarge ||
      !result.day2Visible
    );
  });

  if (failures.length > 0) {
    process.exitCode = 1;
  }
})();
