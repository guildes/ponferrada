import { Page } from "puppeteer";
import TestUtils from "react-dom/test-utils";
import { Store } from "redux";

import { history } from "../..";
import { createDom } from "../../../utils/test/dom";
import { whenOnNavigatedToRoute } from "../../../utils/test/navigation";
import {
  DASHBOARD_ACTIVE_ROUTE,
  DASHBOARD_AUTHORED_ROUTE,
  DASHBOARD_ENDED_ROUTE,
  DASHBOARD_ROUTE,
} from "../../paths";

export const travelToDashboard = async (store: Store): Promise<React.Component> => {
  const dom = createDom(store);
  TestUtils.act((): void => {
    history.push(DASHBOARD_ROUTE);
  });
  await whenOnNavigatedToRoute(DASHBOARD_ROUTE);

  return dom;
};

export const travelToDashboardActive = async (store: Store): Promise<React.Component> => {
  const dom = createDom(store);
  TestUtils.act((): void => {
    history.push(DASHBOARD_ACTIVE_ROUTE);
  });
  await whenOnNavigatedToRoute(DASHBOARD_ACTIVE_ROUTE);

  return dom;
};

export const travelToDashboardAuthored = async (store: Store): Promise<React.Component> => {
  const dom = createDom(store);
  TestUtils.act((): void => {
    history.push(DASHBOARD_AUTHORED_ROUTE);
  });
  await whenOnNavigatedToRoute(DASHBOARD_AUTHORED_ROUTE);

  return dom;
};

export const travelToDashboardEnded = async (store: Store): Promise<React.Component> => {
  const dom = createDom(store);
  TestUtils.act((): void => {
    history.push(DASHBOARD_ENDED_ROUTE);
  });
  await whenOnNavigatedToRoute(DASHBOARD_ENDED_ROUTE);

  return dom;
};

export const travelToDashboardE2e = async (page: Page): Promise<void> => {
  await page.click("button");
};
