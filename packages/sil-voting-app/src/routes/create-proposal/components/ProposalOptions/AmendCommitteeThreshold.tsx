import { FormApi } from 'final-form';
import Block from 'medulas-react-components/lib/components/Block';
import TextFieldForm from 'medulas-react-components/lib/components/forms/TextFieldForm';
import Typography from 'medulas-react-components/lib/components/Typography';
import React from 'react';

interface Props {
  form: FormApi;
}

const AmendCommitteeThreshold = ({ form }: Props): JSX.Element => {
  return (
    <Block width="100%" display="flex" alignItems="center" marginTop={2} marginBottom={2}>
      <Typography>Custom Field for AmendCommitteeThreshold </Typography>
      <TextFieldForm
        name="AmendCommitteeThreshold"
        form={form}
        placeholder="AmendCommitteeThreshold"
        fullWidth
        margin="none"
      />
    </Block>
  );
};

export default AmendCommitteeThreshold;
