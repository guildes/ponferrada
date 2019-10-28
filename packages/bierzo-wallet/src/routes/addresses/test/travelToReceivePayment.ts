import { Page } from "puppeteer";

import { ADDRESSES_TEXT } from "../../../components/Header/components/LinksMenu";
import { whenOnNavigatedToE2eRoute } from "../../../utils/test/navigation";
import { ADDRESSES_ROUTE } from "../../paths";
import { yourAddresses } from "../components/AddressesTab";
import { yourBlockchainAddressesId } from "../components/UserAddresses";

export async function travelToAddressesE2E(page: Page): Promise<void> {
  const [addressesLink] = await page.$x(`//h6[contains(., '${ADDRESSES_TEXT}')]`);
  await addressesLink.click();
  await whenOnNavigatedToE2eRoute(page, ADDRESSES_ROUTE);
}

export async function travelToBlockchainAddressesTabE2E(page: Page): Promise<void> {
  const [addressesLink] = await page.$x(`//h6[contains(., '${yourAddresses}')]`);
  await addressesLink.click();
  await page.waitForSelector(`#${yourBlockchainAddressesId}`);
}
