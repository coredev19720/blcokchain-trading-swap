import { uIdGen } from "@/src/utils/helpers";
import { TextField } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";
import { KeyboardEvent } from "react";
import FieldLabel from "@/src/components/common/FieldLabel";
import { useTranslations } from "next-intl";
import HelpText from "@/src/components/common/HelpText";
import { InputProps } from "@mui/material";
import { FieldBlock } from "@src/styles/common";
type Partial<T> = {
  [P in keyof T]?: T[P];
};
type Props = {
  autofocus?: boolean;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleEnter?: (e: KeyboardEvent<HTMLDivElement>, field: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  isError: boolean;
  control: Control<FieldValues, any>;
  errMsg: string;
  name: string;
  label: string;
  defaultValue?: string | number;
  inputProps?: Partial<InputProps>;
  required?: boolean;
  min?: number;
  max?: number;
  type?: string;
};
const TextInput = ({
  onChangeValue,
  handleEnter,
  inputRef,
  isError,
  control,
  errMsg,
  name,
  label,
  defaultValue,
  autofocus,
  inputProps,
  required,
  min,
  max,
  type,
}: Props) => {
  const tMess = useTranslations("mess");
  const renderInput = ({ field }: any) => {
    const { value } = field;
    return (
      <TextField
        autoFocus={autofocus}
        onChange={onChangeValue}
        value={value}
        type={type || "text"}
        variant="outlined"
        id={uIdGen()}
        autoComplete="off"
        onKeyDown={(e) => {
          handleEnter && handleEnter(e, name);
        }}
        error={isError}
        inputRef={inputRef}
        fullWidth
        InputProps={inputProps}
      />
    );
  };
  return (
    <FieldBlock>
      <FieldLabel>{label}</FieldLabel>
      <Controller
        control={control}
        name={name}
        render={renderInput}
        defaultValue={defaultValue || ""}
        rules={{
          required: { value: !!required, message: tMess("required_field") },
          ...(min
            ? {
                minLength: {
                  value: min,
                  message: tMess("required_min_length", { min }),
                },
              }
            : {}),
          ...(max
            ? {
                maxLength: {
                  value: max,
                  message: tMess("limit_max_length", { max }),
                },
              }
            : {}),
        }}
      />
      {isError && <HelpText stt="error" txt={errMsg} />}
    </FieldBlock>
  );
};

export default TextInput;
