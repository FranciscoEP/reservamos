import React from 'react';
import { Spinner, Flex, Text } from '@chakra-ui/react';

export const Loading = () => (
  <Flex
    d="flex"
    direction="column"
    bg="rgb(18,31,61)"
    my="10rem"
    justify="center"
    align="center"
  >
    <Text color="white" size="xl">
      Loading...
    </Text>
    <Spinner color="white" size="xl" />;
  </Flex>
);
