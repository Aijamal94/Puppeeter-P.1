let page;

beforeEach(async () => {
  jest.setTimeout(60000);
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content", async () => {
    jest.setTimeout(60000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Where the world builds software · GitHub");
  });

  test("The first link attribute", async () => {
    jest.setTimeout(60000); 
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    jest.setTimeout(60000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  });



  test("Check if 'Explore' link is present", async () => {
    jest.setTimeout(60000);
    const exploreLink = await page.$("a[href='/explore']");
    expect(exploreLink).toBeTruthy();
  });

  test("The page has a footer", async () => {
    jest.setTimeout(60000);
    const footer = await page.$("footer");
    expect(footer).toBeTruthy();
  });

  test("GitHub logo is visible on the page", async () => {
    jest.setTimeout(60000);
    const logoSelector = "img[alt='GitHub']";
    const logo = await page.$(logoSelector);
    expect(logo).toBeTruthy();
  });
});
