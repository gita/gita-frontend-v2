import { chromium, devices } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = process.env.OUT || "./out";

// Three real profiles. iPhone/Pixel carry proper mobile UA, DPR and touch —
// which is the whole point, and what window-resizing could not give us.
const PROFILES = [
  { key: "desktop", ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 } },
  { key: "iphone", ctx: { ...devices["iPhone 15 Pro"] } },
  { key: "android", ctx: { ...devices["Pixel 7"] } },
];

const SITES = {
  "bible-com": [
    ["01-home", "https://www.bible.com/"],
    ["02-verse", "https://www.bible.com/bible/111/JHN.3.16.NIV"],
    ["03-chapter", "https://www.bible.com/bible/111/PSA.23.NIV"],
    ["04-plans", "https://www.bible.com/reading-plans"],
    ["05-videos", "https://www.bible.com/videos"],
    ["06-votd", "https://www.bible.com/verse-of-the-day"],
    ["07-app", "https://www.bible.com/app"],
    ["08-versions", "https://www.bible.com/versions"],
  ],
  "quran-com": [
    ["01-home", "https://quran.com/"],
    ["02-surah", "https://quran.com/2"],
    ["03-verse", "https://quran.com/2/255"],
    ["04-about", "https://quran.com/about-us"],
    ["05-reciters", "https://quran.com/reciters"],
  ],
  sefaria: [
    ["01-texts", "https://www.sefaria.org/texts"],
    ["02-topics", "https://www.sefaria.org/topics"],
    ["03-text", "https://www.sefaria.org/Genesis.1?lang=bi"],
  ],
  hallow: [["01-home", "https://hallow.com/"]],
  calm: [["01-home", "https://www.calm.com/"]],
  abide: [["01-home", "https://abide.com/"]],
  glorify: [["01-home", "https://glorify-app.com/"]],
};

// What we're testing: does the page adapt its store CTA to the device?
const PROBE = `(() => {
  const meta = document.querySelector('meta[name="apple-itunes-app"]');
  const txt = document.body.innerText || '';
  const hrefs = [...document.querySelectorAll('a[href]')].map(a => a.href);
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const visibleStore = sel => [...document.querySelectorAll(sel)].filter(vis).length;
  return {
    ua: navigator.userAgent.slice(0, 70),
    touch: 'ontouchstart' in window, pts: navigator.maxTouchPoints,
    dpr: devicePixelRatio, vw: innerWidth,
    smartAppBanner: meta ? meta.content : null,
    appStoreLinks: hrefs.filter(h => /apps\\.apple\\.com|itunes\\.apple\\.com/.test(h)).length,
    playStoreLinks: hrefs.filter(h => /play\\.google\\.com/.test(h)).length,
    appStoreVisible: visibleStore('a[href*="apps.apple.com"], a[href*="itunes.apple.com"]'),
    playStoreVisible: visibleStore('a[href*="play.google.com"]'),
    mentionsAppStore: /App Store/i.test(txt),
    mentionsGooglePlay: /Google Play/i.test(txt),
    stickyBottom: [...document.querySelectorAll('*')].filter(el => {
      const s = getComputedStyle(el);
      if (s.position !== 'fixed' && s.position !== 'sticky') return false;
      const r = el.getBoundingClientRect();
      return r.bottom > innerHeight - 160 && r.height > 30 && r.width > innerWidth * 0.5;
    }).map(el => (el.innerText || '').replace(/\\s+/g, ' ').trim().slice(0, 110)).filter(Boolean).slice(0, 3),
  };
})()`;

const report = [];

const browser = await chromium.launch();
for (const [site, pages] of Object.entries(SITES)) {
  for (const p of PROFILES) {
    const context = await browser.newContext({ ...p.ctx, locale: "en-US" });
    const page = await context.newPage();
    const dir = path.join(OUT, site, p.key);
    fs.mkdirSync(dir, { recursive: true });

    for (const [name, url] of pages) {
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
        await page.waitForTimeout(4500);
        // dismiss cookie/consent so it doesn't cover the fold in every shot
        for (const t of ["OK", "Accept", "Got it", "I agree", "Accept all"]) {
          try { await page.getByRole("button", { name: t, exact: false }).first().click({ timeout: 900 }); break; } catch {}
        }
        await page.waitForTimeout(900);
        // full page — captures every section, not just the hero
        await page.screenshot({ path: path.join(dir, `${name}-full.jpg`), fullPage: true, quality: 72, type: "jpeg" });
        await page.screenshot({ path: path.join(dir, `${name}-fold.jpg`), quality: 78, type: "jpeg" });
        const probe = await page.evaluate(PROBE);
        report.push({ site, profile: p.key, name, url, ...probe });
        console.log(`✓ ${site}/${p.key}/${name}`);
      } catch (e) {
        console.log(`✗ ${site}/${p.key}/${name} — ${String(e).split("\n")[0].slice(0, 80)}`);
        report.push({ site, profile: p.key, name, url, error: String(e).slice(0, 120) });
      }
    }
    await context.close();
  }
}
await browser.close();
fs.writeFileSync(path.join(OUT, "probe.json"), JSON.stringify(report, null, 1));
console.log("\ndone —", report.length, "captures");
