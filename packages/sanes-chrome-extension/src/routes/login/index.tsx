import { FormValues, ValidationError } from 'medulas-react-components/lib/components/forms/Form';
import PageLayout from 'medulas-react-components/lib/components/PageLayout';
import { ToastContext } from 'medulas-react-components/lib/context/ToastProvider';
import { ToastVariant } from 'medulas-react-components/lib/context/ToastProvider/Toast';
import * as React from 'react';

import { PersonaContext } from '../../context/PersonaProvider';
import { history } from '../../store/reducers';
import { loadPersona } from '../../utils/chrome';
import { ACCOUNT_STATUS_ROUTE, LOGIN_ROUTE, WELCOME_ROUTE } from '../paths';
import { PASSWORD_FIELD } from '../signup/components/NewAccountForm';
import LoginControls from './components/LoginControls';
import LoginForm from './components/LoginForm';

const validate = (values: object): object => {
  const formValues = values as FormValues;
  let errors: ValidationError = {};
  if (!formValues[PASSWORD_FIELD]) {
    errors[PASSWORD_FIELD] = 'Required';
  }

  return errors;
};

const onBack = (): void => {
  history.push(WELCOME_ROUTE);
};

const Login = (): JSX.Element => {
  const personaProvider = React.useContext(PersonaContext);
  const toast = React.useContext(ToastContext);

  const onLogin = async (formValues: FormValues): Promise<void> => {
    const password = formValues[PASSWORD_FIELD];
    try {
      const response = await loadPersona(password);
      personaProvider.update({
        accounts: response.accounts,
        mnemonic: response.mnemonic,
        txs: response.txs,
      });
      history.push(ACCOUNT_STATUS_ROUTE);
    } catch (_) {
      toast.show('Error during login', ToastVariant.ERROR);
    }
  };

  return (
    <PageLayout id={LOGIN_ROUTE} primaryTitle="Log" title="In" onBack={onBack}>
      <LoginForm onLogin={onLogin} validate={validate} />
      <LoginControls />
    </PageLayout>
  );
};

export default Login;
