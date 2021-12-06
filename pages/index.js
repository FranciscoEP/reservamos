import Head from 'next/head';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Box, Heading } from '@chakra-ui/react';
import { Loading } from '../src/components/Loading';
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
  const [loading, setLoading] = useState(false);

  const filteredCities = (citiesArr) =>
    citiesArr.filter((ele) => ele.result_type === 'city');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(BACKEND_API);
        const json = await response.json();
        const filteredData = filteredCities(json);
        setCities(filteredData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (_.isEmpty(city)) return;
    const cityData = cities.filter((ele) => ele.display === city);
    const citySelected = Object.assign({}, ...cityData);

    (async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${OPEN_WEATHER_API}?lat=${citySelected.lat}&lon=${citySelected.long}&exclude=${parts}&appid=${OPEN_WEATHER_TOKEN}&units=metric&lang=en`
        );
        const json = await response.json();
        setWeatherData(json);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
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
        {loading && <Loading />}
        {!_.isEmpty(weatherData) && (
          <Box mx="5rem" my="1rem">
            <Heading color="#fff" my="2rem">
              {city} weather forecast for this week:
            </Heading>
            <WeatherLayout>
              {weatherData?.daily.slice(0, 7).map((ele, idx) => (
                <WeatherCard
                  dt={ele?.dt}
                  max={ele?.temp?.max}
                  min={ele?.temp?.min}
                  code={ele?.weather[0]?.id}
                  description={ele?.weather[0]?.description}
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
