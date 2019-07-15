import { TokenTicker } from '@iov/bcp';
import TestUtils from 'react-dom/test-utils';
import { DeepPartial, Store } from 'redux';

import { aNewStore } from '../../store';
import { BalanceState } from '../../store/balances';
import { RootState } from '../../store/reducers';
import { expectRoute } from '../../utils/test/dom';
import { findRenderedDOMComponentWithId } from '../../utils/test/reactElemFinder';
import { PAYMENT_ROUTE, RECEIVE_FROM_IOV_USER } from '../paths';
import { getNoFundsMessage } from './test/operateBalances';
import { travelToBalance } from './test/travelToBalance';

const balancesAmount: DeepPartial<BalanceState> = {
  IOV: {
    quantity: '82500',
    fractionalDigits: 4,
    tokenTicker: 'IOV' as TokenTicker,
  },
  ETH: {
    quantity: '1226775',
    fractionalDigits: 5,
    tokenTicker: 'ETH' as TokenTicker,
  },
};

describe('The /balance route', () => {
  let store: Store<RootState>;
  let balanceDom: React.Component;
  describe('with balance', () => {
    beforeEach(
      async (): Promise<void> => {
        store = aNewStore({
          extension: {
            connected: true,
            installed: true,
          },
          balances: balancesAmount,
        });
        balanceDom = await travelToBalance(store);
      },
    );

    it('redirects to the /payment route when clicked', async () => {
      const paymentCard = (await findRenderedDOMComponentWithId(balanceDom, PAYMENT_ROUTE)) as Element;

      expect(paymentCard.textContent).toBe('Send payment');

      TestUtils.Simulate.click(paymentCard);
      expectRoute(PAYMENT_ROUTE);
    });

    it('redirects to the /receive-from-iov route when clicked', async () => {
      const receiveCard = (await findRenderedDOMComponentWithId(
        balanceDom,
        RECEIVE_FROM_IOV_USER,
      )) as Element;

      expect(receiveCard.textContent).toBe('Receive Payment');

      TestUtils.Simulate.click(receiveCard);
      //TODO: check for new route after "Receive payment" component implementation
      //expectRoute(RECEIVE_FROM_IOV_USER);
    });

    it('should check list of available balances', async () => {
      const balances = TestUtils.scryRenderedDOMComponentsWithClass(balanceDom, 'MuiTypography-colorPrimary');

      expect(balances.length).toBe(2);

      expect(balances[0].textContent).toBe('8.25 IOV');
      expect(balances[1].textContent).toBe('12.26775 ETH');
    });
  });

  describe('without balance', () => {
    beforeEach(
      async (): Promise<void> => {
        store = aNewStore({
          extension: {
            connected: true,
            installed: true,
          },
        });
        balanceDom = await travelToBalance(store);
      },
    );

    it('should show that there is no balance available', async () => {
      const noFundsMessage = getNoFundsMessage(TestUtils.scryRenderedDOMComponentsWithTag(balanceDom, 'h6'));

      expect(noFundsMessage).toBe('No funds available');
    });
  });
});
