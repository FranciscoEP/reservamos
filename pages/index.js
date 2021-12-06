import Head from 'next/head';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Box, Heading, Flex } from '@chakra-ui/react';
import {
  BACKEND_API,
  OPEN_WEATHER_TOKEN,
  OPEN_WEATHER_API,
  parts,
} from '../src/utils/constants';
import { WeatherCard, WeatherLayout, Autocomplete } from '../src/components';

export default function Home() {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [weatherData, setWeatherData] = useState({});

  const filteredCities = (citiesArr) =>
    citiesArr.filter((ele) => ele.result_type === 'city');

  useEffect(() => {
    (async () => {
      const response = await fetch(BACKEND_API);
      const json = await response.json();
      const filteredData = filteredCities(json);
      setCities(filteredData);
    })();
  }, []);

  useEffect(() => {
    if (_.isEmpty(city)) return;
    const cityData = cities.filter((ele) => ele.display === city);
    const citySelected = Object.assign({}, ...cityData);

    (async () => {
      const response = await fetch(
        `${OPEN_WEATHER_API}?lat=${citySelected.lat}&lon=${citySelected.long}&exclude=${parts}&appid=${OPEN_WEATHER_TOKEN}&units=metric&lang=es`
      );
      const json = await response.json();
      setWeatherData(json);
    })();
  }, [city, cities]);

  return (
    <>
      <Head>
        <title>Reservamos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg="rgb(18,31,61)">
        <Heading
          as="h1"
          my="2rem"
          textAlign="center"
          color="#fff"
          fontSize={['2rem', '4rem', '5rem']}
          fontWeight="800"
        >
          Weather App
        </Heading>
        <Autocomplete options={cities} setState={setCity} />

        {!_.isEmpty(weatherData) && (
          <Box mx="5rem" my="1rem">
            <Heading color="#fff" my="2rem">
              El clima para {city} es:{' '}
            </Heading>
            <WeatherLayout>
              {weatherData?.daily.slice(0, 7).map((ele, idx) => (
                <WeatherCard
                  dt={ele.dt}
                  max={ele.temp.max}
                  min={ele.temp.min}
                  code={ele.weather[0].id}
                  description={ele.weather[0].description}
                  key={idx}
                />
              ))}
            </WeatherLayout>
          </Box>
        )}
      </Box>
    </>
  );
}
