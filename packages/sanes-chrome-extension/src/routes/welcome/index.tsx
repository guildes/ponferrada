import * as React from 'react';
import Button from 'medulas-react-components/lib/components/Button';
import Typography from 'medulas-react-components/lib/components/Typography';
import Block from 'medulas-react-components/lib/components/Block';
import PageLayout from 'medulas-react-components/lib/components/PageLayout';
import { history } from '../../store/reducers';
import { SIGNUP_ROUTE, LOGIN_ROUTE, WELCOME_ROUTE } from '../paths';

const createNewAccount = (): void => {
  history.push(SIGNUP_ROUTE);
};

const login = (): void => {
  history.push(LOGIN_ROUTE);
};

const Welcome = (): JSX.Element => (
  <PageLayout id={WELCOME_ROUTE} primaryTitle="Welcome" title="to your IOV manager">
    <Typography variant="body1" inline>
      This plugin lets you manage all your accounts in one place.
    </Typography>
    <Block marginTop={2} />
    <Button variant="contained" fullWidth onClick={login}>
      Log in
    </Button>
    <Block marginTop={2} />
    <Button variant="contained" fullWidth onClick={createNewAccount}>
      New account
    </Button>
    <Block marginTop={2} />
    <Button variant="contained" fullWidth>
      Import account
    </Button>
  </PageLayout>
);

export default Welcome;
