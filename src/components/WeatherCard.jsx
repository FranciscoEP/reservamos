import { Box, Center, Text, Stack } from '@chakra-ui/react';
import AnimatedNumber from 'animated-number-react';
import Skycons from 'react-skycons';
import { getIcon } from '../utils/constants';

export const WeatherCard = ({
  dt,
  min,
  max,
  maxTemper,
  code,
  idx,
  description,
}) => {
  const formatValue = (value) => `${Math.floor(Number(value).toFixed(2))}`;

  return (
    <Center my="1rem" key={idx}>
      <Box
        minW={['100%', '25rem', '20rem']}
        w="full"
        bg="rgb(36,55,90)"
        boxShadow="6xl"
        rounded="md"
        overflow="hidden"
        shadow="xl"
        border={max === maxTemper ? '1px solid red' : 'none'}
      >
        <Stack textAlign="center" p={6} color="gray.800" align="center">
          <Text
            fontSize="sm"
            fontWeight={700}
            bg="blue.50"
            p={2}
            px={3}
            color="blue.600"
            rounded="full"
          >
            {new Date(dt * 1000)
              .toLocaleString('en-US', {
                weekday: 'long',
              })
              .toUpperCase()}
          </Text>
          <Stack direction="row" align="center" justify="center">
            <Text fontSize="3xl" color="gray.500">
              Min.
            </Text>
            <Text fontSize="6xl" fontWeight={800} color="#fff">
              <AnimatedNumber
                value={Math.floor(min)}
                style={{
                  transition: '.1s ease-out',
                  fontSize: 48,
                  transitionProperty: 'background-color, color, opacity',
                }}
                formatValue={formatValue}
              />
            </Text>
            <Text color="gray.500" fontSize="6xl">
              ˚C
            </Text>
          </Stack>
          <Stack direction="row" align="center" justify="center">
            <Skycons
              color="white"
              size={50}
              animate
              resizeClear
              type={getIcon(code)}
            />
          </Stack>
          <Stack direction="row" align="center" justify="center">
            <Text
              textTransform="capitalize"
              color="white"
              fontSize="md"
              fontWeight="bold"
            >
              {description}
            </Text>
          </Stack>
          <Stack direction="row" align="center" justify="center">
            <Text fontSize="3xl" color="gray.500">
              Max.
            </Text>

            <Text fontSize="6xl" fontWeight={800} color="#fff">
              <AnimatedNumber
                value={Math.floor(max)}
                style={{
                  transition: '12s ease-out',
                  fontSize: 48,
                  transitionProperty: 'background-color, color, opacity',
                }}
                formatValue={formatValue}
              />
            </Text>
            <Text color="gray.500" fontSize="6xl">
              ˚C
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
