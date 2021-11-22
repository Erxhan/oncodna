import { FormErrorMessage } from '@chakra-ui/react';
import * as React from 'react';
import { FieldError } from 'react-hook-form';

interface Props {
  error: FieldError | string;
}

const InputError: React.FC<Props> = (props) => {
  if (!props.error) return null;

  return (
    <>
      {typeof props.error === 'string' ? (
        <FormErrorMessage whiteSpace="pre-line">{props.error}</FormErrorMessage>
      ) : props.error.message ? (
        <FormErrorMessage whiteSpace="pre-line">
          {props.error.message}
        </FormErrorMessage>
      ) : (
        props.error.types &&
        Object.values(props.error.types).map((error, i) => {
          return (
            <FormErrorMessage key={i} whiteSpace="pre-line">
              {error}
            </FormErrorMessage>
          );
        })
      )}
    </>
  );
};

export default InputError;
