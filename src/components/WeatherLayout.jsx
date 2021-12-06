import { SimpleGrid } from '@chakra-ui/react';

export const WeatherLayout = ({ children }) => (
  <SimpleGrid
    columns={[1, 1, 2, 2, 3]}
    w="100%"
    mx="auto"
    spacing={5}
    height="auto"
    borderRadius="10px"
  >
    {children}
  </SimpleGrid>
);
