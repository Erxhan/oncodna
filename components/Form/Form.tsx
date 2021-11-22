import { SpaceProps, StackProps, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

type Props<T> = UseFormReturn<T> & {
  children: React.ReactElement | React.ReactElement[];
  onSubmit?: SubmitHandler<any>;
  stackProps?: StackProps & SpaceProps;
};

export function Form<T>({
  onSubmit,
  children,
  stackProps,
  ...props
}: Props<T>) {
  return (
    <FormProvider {...props}>
      <VStack as="form" w="100%" onSubmit={onSubmit} {...stackProps}>
        {children}
      </VStack>
    </FormProvider>
  );
}
