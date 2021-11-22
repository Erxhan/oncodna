import { FormControl, Input as CInput, InputProps } from "@chakra-ui/react";
import React from "react";
import {
  FieldError,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import InputError from "./InputError";

interface Props extends InputProps {
  name: string;
  label?: string;
  subLabel?: string;
  validation?: RegisterOptions<FieldValues>;
}

const Input = ({ label, subLabel, validation, width, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors?.[props.name] as FieldError | string;

  return (
    <FormControl
      position="relative"
      isInvalid={!!fieldError}
      isRequired={props.isRequired}
      width={width}
    >
      <CInput
        size="lg"
        borderRadius="8px"
        {...props}
        my={0}
        {...props}
        {...register(props.name, { ...validation })}
      />
      <InputError error={fieldError} />
    </FormControl>
  );
};

export default Input;
