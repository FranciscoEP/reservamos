import { useState } from 'react';

import { Input, Box, Text } from '@chakra-ui/react';

export const Autocomplete = ({ options, setState }) => {
  const [suggestions, setSuggestions] = useState([]);
  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      const regex = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      console.log(regex);
      matches = options.filter((ele) =>
        ele.city_slug.toLowerCase().match(regex)
      );
    }
    setSuggestions(matches);
    setState(text);
  };

  const onSuggestionHandler = (text) => {
    setState(text);
    setSuggestions([]);
  };

  console.log(suggestions);
  return (
    <Box w={['100%', '30rem']} mx={['1rem', 'auto']} borderRadius="4px">
      <Input
        _focus={{ boxShadow: '0 0 0 3px #EAF8FF' }}
        color="#fff"
        fontWeight="600"
        placeholder="Search for a city located in MX or US"
        onChange={(e) => onChangeHandler(e.target.value)}
        aria-label="Search for a city located in MX or US"
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([]);
          }, 100);
        }}
      />
      {suggestions && (
        <Box my="1rem" borderRadius="4px">
          {suggestions.slice(0, 10).map(({ display }, idx) => (
            <Box
              onClick={() => onSuggestionHandler(display)}
              key={idx}
              fontWeight="700"
              w="30rem"
              bg="#fff"
              borderTop="1px solid #E0E0E0"
              p=".5rem"
              overflowY="hidden"
              cursor="pointer"
              _hover={{ backgroundColor: 'gainsboro' }}
            >
              <Text>{display}</Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
