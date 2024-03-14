import React from "react";
import { Input as In } from "antd";

type Props = {
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  height?: number;
  width?: string;
  label?: string;
  prefix?: React.ReactNode;
};

const Input = (props: Props) => {
  return (
    <div>
      {props.label && <label htmlFor="sessionName">{props.label}</label> }
    <In
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      className={`rounded-[8px] h-[40px] px-3 py-2 ${props.className} ${
        props.disabled ? "cursor-not-allowed" : ""
      }`}
      type={props.type}
      name={props.name}
      id={props.id}
      disabled={props.disabled}
      required={props.required}
      readOnly={props.readOnly}
      width={props.width || "100%"}
      prefix={props.prefix}
    />
    </div>
  );
};

export default Input;
