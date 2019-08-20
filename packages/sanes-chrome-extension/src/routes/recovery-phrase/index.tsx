import { PageLayout } from "medulas-react-components";
import * as React from "react";

import { PersonaContext } from "../../context/PersonaProvider";
import { history } from "../../utils/history";
import { RECOVERY_PHRASE_ROUTE } from "../paths";
import ShowRecoveryPhrase from "./components/ShowRecoveryPhrase";

const onBack = (): void => {
  history.goBack();
};

const RecoveryPhrase = (): JSX.Element => {
  const persona = React.useContext(PersonaContext);

  return (
    <PageLayout id={RECOVERY_PHRASE_ROUTE} primaryTitle="Recovery" title="phrase" onBack={onBack}>
      <ShowRecoveryPhrase mnemonic={persona.mnemonic} />
    </PageLayout>
  );
};

export default RecoveryPhrase;
