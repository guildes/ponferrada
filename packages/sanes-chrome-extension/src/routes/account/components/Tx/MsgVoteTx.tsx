import { Typography } from "medulas-react-components";
import * as React from "react";

interface MsgVoteTxProps {
  readonly id: string;
  readonly blockExplorerUrl: string | null;
  readonly error?: any;
  readonly selection: string;
}

const MsgVoteTx = ({ error, selection }: MsgVoteTxProps): JSX.Element => {
  if (error) {
    return (
      <React.Fragment>
        <Typography weight="light" inline>
          Your attempt to vote{" "}
        </Typography>
        <Typography weight="semibold" inline link>
          {selection}
        </Typography>
        <Typography weight="light" inline>
          {" "}
          was{" "}
        </Typography>
        <Typography weight="semibold" inline>
          unsuccessful
        </Typography>
        <Typography weight="light" inline>
          , please try again later.
        </Typography>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Typography weight="light" inline>
          You have voted{" "}
        </Typography>
        <Typography weight="semibold" inline link>
          {selection}
        </Typography>
        <Typography weight="light" inline>
          {" "}
          .
        </Typography>
      </React.Fragment>
    );
  }
};

export default MsgVoteTx;
