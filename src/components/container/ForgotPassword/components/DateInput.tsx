import { Control, Controller, FieldValues } from "react-hook-form";
import FieldLabel from "@/src/components/common/FieldLabel";
import * as S from "../styles";
import { useTranslations } from "next-intl";
import HelpText from "@/src/components/common/HelpText";
import StyledDatePicker from "@/src/components/common/StyledDatePicker";
type Props = {
  onChangeValue: (e: Date, name: string) => void;
  isError: boolean;
  control: Control<FieldValues, any>;
  errMsg: string;
  name: string;
  label: string;
  defaultValue?: Date;
};
const DateInput = ({
  onChangeValue,
  isError,
  control,
  errMsg,
  name,
  label,
  defaultValue,
}: Props) => {
  const tMess = useTranslations("mess");
  const renderInput = ({ field }: any) => {
    const { value } = field;
    return (
      <StyledDatePicker
        handleChange={(e: Date) => onChangeValue(e, name)}
        selected={value}
      />
    );
  };
  return (
    <S.FieldBlock>
      <FieldLabel>{label}</FieldLabel>
      <Controller
        control={control}
        name={name}
        render={renderInput}
        defaultValue={defaultValue || new Date()}
        rules={{
          required: { value: true, message: tMess("required_field") },
        }}
      />
      {isError && <HelpText stt="error" txt={errMsg} />}
    </S.FieldBlock>
  );
};

export default DateInput;
