import Head from 'next/head';
import { useState, useEffect } from 'react';
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { BACKEND_API } from './utils/constants';

export default function Home() {
  const [cities, setCities] = useState([]);

  const filteredCities = (citiesArr) => citiesArr.filter((ele) => ele.result_type === 'city');

  useEffect(() => {
    (async () => {
      const response = await fetch(BACKEND_API);
      const json = await response.json();
      const filteredData = filteredCities(json);
      setCities(filteredData);
    })();
  }, []);

  return (
    <Flex
      boxSize="full"
      h="100vh"
      pos="absolute"
      bg={useColorModeValue('gray.400', 'gray.600')}
      p={30}
      justifyContent="center"
    >
      <Head>
        <title>Reservamos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AutoComplete rollNavigation>
        <AutoCompleteInput variant="filled" placeholder="Search..." autoFocus />
        <AutoCompleteList>
          {cities.map(({ display }, idx) => (
            <AutoCompleteItem key={`option-${idx}`} value={display} textTransform="capitalize">
              {display}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Flex>
  );
}
