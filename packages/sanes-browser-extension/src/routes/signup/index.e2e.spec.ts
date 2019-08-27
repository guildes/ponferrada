import { Browser, Page } from "puppeteer";
import { randomString } from "ui-logic";

import { closeBrowser, createPage, launchBrowser } from "../../utils/test/e2e";
import { withChainsDescribe } from "../../utils/test/testExecutor";
import {
  submitNewWalletE2E,
  submitSecurityHintE2E,
  submitShowPhraseE2E,
  travelToSignupNewAccountStep,
} from "./test/operateSignup";

withChainsDescribe("DOM > Signup route", () => {
  let browser: Browser;
  let page: Page;

  beforeEach(async () => {
    browser = await launchBrowser();
    page = await createPage(browser);
  }, 45000);

  afterEach(async () => {
    await closeBrowser(browser);
  });

  it("should redirect to signup route, fill required data, show recovery phrase and hint", async () => {
    await travelToSignupNewAccountStep(page);
    await submitNewWalletE2E(page, randomString(10), randomString(10));
    await submitShowPhraseE2E(page);
    await submitSecurityHintE2E(page, randomString(10));
  }, 60000);
});
