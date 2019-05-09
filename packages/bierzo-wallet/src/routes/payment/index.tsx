import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Block from 'medulas-react-components/lib/components/Block';
import Button from 'medulas-react-components/lib/components/Button';
import Form, { useForm } from 'medulas-react-components/lib/components/forms/Form';
import React from 'react';
import CurrencyToSend from './components/CurrencyToSend';
import ReceiverAddress from './components/ReceiverAddress';
import TextNote from './components/TextNote';

const useStyles = makeStyles((theme: Theme) => ({
  payment: {
    backgroundColor: theme.palette.background.default,
    gridTemplateColumns: '1fr minmax(375px, 450px) 1fr',
    gridTemplateAreas: `
  ". currency-to-send ."
  ". receiver-address ."
  ". text-note        ."
  ". continue-button  ."
  `,
    gridGap: '24px',
    placeItems: 'center',
  },

  currencyToSend: {
    gridArea: 'currency-to-send',
  },

  receiverAddress: {
    gridArea: 'receiver-address',
  },

  textNote: {
    gridArea: 'text-note',
  },

  continue: {
    gridArea: 'continue-button',
  },
}));

const onSubmit = (): void => {};

const Payment = (): JSX.Element => {
  const classes = useStyles();

  const { form, handleSubmit, invalid, pristine, submitting } = useForm({
    onSubmit,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Block
        width="100vw"
        height="auto"
        minHeight="100vh"
        display="grid"
        alignContent="center"
        justifyContent="center"
        className={classes.payment}
      >
        <Block width="100%" className={classes.currencyToSend}>
          <CurrencyToSend form={form} />
        </Block>
        <Block width="100%" className={classes.receiverAddress}>
          <ReceiverAddress form={form} />
        </Block>
        <Block width="100%" className={classes.textNote}>
          <TextNote form={form} />
        </Block>
        <Block width="75%" className={classes.continue}>
          <Button fullWidth type="submit" disabled={invalid || pristine || submitting}>
            Continue
          </Button>
        </Block>
      </Block>
    </Form>
  );
};

export default Payment;
