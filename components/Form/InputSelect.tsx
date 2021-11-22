import { FormControl, Select, SelectProps } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import InputError from "./InputError";

interface Props extends SelectProps {
  name: string;
  placeholder?: string;
  label?: string;
  children: ReactElement | ReactElement[];
}

export const InputSelect = ({
  placeholder,
  children,
  label,
  width,
  ...props
}: Props) => {
  const {
    register,
    formState: { errors },
    setFocus,
    watch,
    getValues,
  } = useFormContext();

  const fieldError = errors?.[props.name] as FieldError | string;

  return (
    <FormControl
      position="relative"
      width={width}
      isRequired={props.isRequired}
    >
      <Select
        height="3rem"
        fontSize="1.2rem"
        fontWeight="bold"
        {...register(props.name)}
        {...props}
      >
        {children}
      </Select>
      <InputError error={fieldError} />
    </FormControl>
  );
};

export default InputSelect;
