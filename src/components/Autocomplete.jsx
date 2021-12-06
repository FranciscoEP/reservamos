import React from 'react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { Flex } from '@chakra-ui/react';

export const Autocomplete = ({ options, setState }) => (
  <Flex w={['100%', '30rem']} mx={['1rem', 'auto']} borderRadius="4px">
    <AutoComplete rollNavigation onChange={(val) => setState(val)}>
      <AutoCompleteInput
        color="#fff"
        fontWeight="600"
        _focus={{ boxShadow: '0 0 0 3px #EAF8FF' }}
        placeholder="Search for the weather in a city located in US or Mexico Only..."
        aria-label="Search the weather in a city located in US or Mexico."
      />
      <AutoCompleteList>
        {options?.map((ele, idx) => (
          <AutoCompleteItem
            key={`option-${idx}`}
            value={ele.display}
            textTransform="capitalize"
          >
            {ele.display}
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  </Flex>
);
