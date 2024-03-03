import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  state?:
    | "danger"
    | "warning"
    | "success"
    | "black-outlined"
    | "gray"
    | "ghost"
    | "primary";
  type?: "outlined" | "filled";
  onClick?: () => void;
};

const Button = (props: Props) => {
  const dangerClassNames =
    props.type === "filled"
      ? "bg-error text-[white] border border-1 border-error hover:bg-error_light hover:text-error"
      : "bg-error_light text-error border border-1 border-error hover:bg-error hover:text-[white]";
  const successClassNames =
    props.type === "filled"
      ? "bg-success text-[white] border border-1 border-success hover:bg-success_light hover:text-success"
      : "bg-success_light text-success border border-1 border-success hover:bg-success hover:text-[white]";
  const primaryClassNames =
    props.type === "filled"
      ? "bg-primary text-[white] border border-1 border-primary hover:bg-primary_light hover:text-primary"
      : "bg-primary_light text-primary border border-1 border-primary hover:bg-primary hover:text-[white]";
  const warningClassNames =
    props.type === "filled"
      ? "bg-secondary text-[white] border border-1 border-secondary hover:bg-secondary_light hover:text-secondary"
      : "bg-secondary_light text-secondary border border-1 border-secondary hover:bg-secondary hover:text-[white]";
  const grayClassNames =
    props.type === "filled"
      ? "bg-gray-600 text-[white] border border-1 border-gray-600 hover:bg-gray-200 hover:text-gray-600"
      : "bg-gray-200 text-gray-600 border border-1 border-gray-600 hover:bg-gray-600 hover:text-[white]";
  const blackOutlinedClassNames =
    props.type === "filled"
      ? "bg-gray-200 text-[black] border border-1 border-black hover:bg-transparent hover:text-[black]"
      : "bg-transparent text-[black] border border-1 border-black hover:bg-gray-200 hover:text-[black]";
  
  const ghostClassNames =
    "p-0 bg-transparent hover:bg-gray-100 cursor-pointer"

  return (
    <Button
      onClick={props.onClick}
      className={` px-3 rounded-[8px] text-sm font-600 leading-[20px] tracking-[0.07px] py-2 flex items-center justify-center ${
        props.state == "danger"
          ? dangerClassNames
          : props.state == "primary"
          ? primaryClassNames
          : props.state == "warning"
          ? warningClassNames
          : props.state == "success"
          ? successClassNames
          : props.state == "black-outlined"
          ? blackOutlinedClassNames
          : props.state == 'ghost'
          ? ghostClassNames
          : grayClassNames

      } ${props.className}`}

    >
      {props.children}
    </Button>
  );
};

export default Button;
