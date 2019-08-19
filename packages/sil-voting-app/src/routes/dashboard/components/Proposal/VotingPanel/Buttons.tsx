import { VoteOption } from "@iov/bns";
import Button from "@material-ui/core/Button";
import { Block, Form, useForm } from "medulas-react-components";
import React, { useState } from "react";

import { sendSignAndPostRequest } from "../../../../../communication/signandpost";
import { getBnsConnection } from "../../../../../logic/connection";
import { getExtensionStatus } from "../../../../../store/extension";

interface Props {
  readonly id: number;
  readonly vote: VoteOption | undefined;
}

const Buttons = ({ id, vote }: Props): JSX.Element => {
  const [currentVote, setCurrentVote] = useState(vote);

  const yesButton = currentVote === VoteOption.Yes ? "contained" : "outlined";
  const noButton = currentVote === VoteOption.No ? "contained" : "outlined";
  const abstainButton = currentVote === VoteOption.Abstain ? "contained" : "outlined";

  const voteYes = (): void => setCurrentVote(VoteOption.Yes);
  const voteNo = (): void => setCurrentVote(VoteOption.No);
  const voteAbstain = (): void => setCurrentVote(VoteOption.Abstain);

  const submitVote = async (): Promise<void> => {
    const governor = (await getExtensionStatus()).governor;
    if (governor && currentVote) {
      const connection = await getBnsConnection();
      const voteTx = await governor.buildVoteTx(id, currentVote);
      await sendSignAndPostRequest(connection, voteTx);
    }
  };

  const { handleSubmit, submitting } = useForm({ onSubmit: submitVote });

  return (
    <Block margin={2}>
      <Form onSubmit={handleSubmit}>
        <Block marginTop={0.5} marginBottom={0.5}>
          <Button fullWidth variant={yesButton} onClick={voteYes} type="submit" disabled={submitting}>
            Yes
          </Button>
        </Block>
        <Block marginTop={0.5} marginBottom={0.5}>
          <Button fullWidth variant={noButton} onClick={voteNo} type="submit" disabled={submitting}>
            No
          </Button>
        </Block>
        <Block marginTop={0.5} marginBottom={0.5}>
          <Button fullWidth variant={abstainButton} onClick={voteAbstain} type="submit" disabled={submitting}>
            Abstain
          </Button>
        </Block>
      </Form>
    </Block>
  );
};

export default Buttons;
