import * as React from 'react';
import {
  FormLabel,
  Text,
  FormLabelProps,
  useColorModeValue
} from '@chakra-ui/react';

interface Props extends Omit<FormLabelProps, 'children'> {
  name?: string;
  label?: string;
  subLabel?: string;
}

const InputLabel: React.FC<Props> = ({ subLabel, ...props }) => {
  const subLabelColor = useColorModeValue('gray.400', 'gray.300');
  if (!props.label) return null;

  return (
    <FormLabel htmlFor={props.name} {...props}>
      {props.label}
      {subLabel && (
        <Text ml={2} as="span" fontSize="0.8rem" color={subLabelColor}>
          {subLabel}
        </Text>
      )}
    </FormLabel>
  );
};

export default InputLabel;
