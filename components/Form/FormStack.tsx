import { Stack } from '@chakra-ui/layout';
import { ReactElement } from 'react';

type FormStackProps = {
  children: ReactElement | ReactElement[];
};

const FormStack = ({ children }: FormStackProps) => {
  return (
    <Stack
      width="100%"
      spacing={['2rem', '2rem', '2rem', '1rem']}
      direction={['column', 'column', 'column', 'row']}
    >
      {children}
    </Stack>
  );
};

export default FormStack;
