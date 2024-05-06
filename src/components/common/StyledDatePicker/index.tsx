import React from "react";
import DatePicker from "react-datepicker";
import { Wrapper, Icon } from "./styles";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  selected: Date;
  handleChange: (val: Date) => void;
}

const StyledDatePicker = ({ selected, handleChange }: Props) => {
  return (
    <Wrapper>
      <DatePicker
        selected={selected}
        onChange={(date) => handleChange(date || new Date())}
        dateFormat="dd/MM/yyyy"
      />
      <Icon className="icon icon-calendarpicker-outlined" />
    </Wrapper>
  );
};

export default StyledDatePicker;
