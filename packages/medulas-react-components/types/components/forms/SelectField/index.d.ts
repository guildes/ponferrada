import { InputBaseProps } from "@material-ui/core/InputBase";
import { FieldSubscription, FieldValidator, FormApi } from "final-form";
import { FieldInputValue } from "../../../utils/forms/validators";
export interface SelectFieldItem {
  readonly name: string;
  readonly additionalText?: string;
}
interface InnerProps {
  readonly fieldName: string;
  readonly initial: string;
  readonly form: FormApi;
  readonly onChangeCallback?: (value: SelectFieldItem) => void;
  readonly subscription?: FieldSubscription;
  readonly validate?: FieldValidator<FieldInputValue>;
  readonly items: readonly SelectFieldItem[];
  readonly maxWidth?: string;
}
export declare type Props = InnerProps & InputBaseProps;
declare const SelectField: ({
  fieldName,
  form,
  initial,
  items,
  onChangeCallback,
  maxWidth,
  validate,
}: Props) => JSX.Element;
export default SelectField;
