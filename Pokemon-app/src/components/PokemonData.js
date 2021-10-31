import React from 'react';
import {
  Container,
  Box,
  Text,
  Image,
  Button,
  Progress,
  Flex,
  Heading,
  Spacer,
  Stack,
} from '@chakra-ui/react';

class PokemonData extends React.Component {
  state = {
    name: '',
    image: '',
  };

  render(props) {
    return (
      <Container bg="linear-gradient(to left, rgba(230,0,0,0.1), rgba(255,0,0,0.6));">
        <Flex
          justify="space-between"
          direction="row"
          margin="20px"
          overflow="hidden"
        >
          <Box color="white">
            <Text fontSize="2xl" color="black" as="u" textTransform="uppercase">
              {this.props.name}
            </Text>

            <Image
              height="150px"
              width="150px"
              src={this.props.sprite}
              alt={this.props.name}
            />
          </Box>

          <Box color="white">
            <Text fontSize="2xl" color="black" as="u">
              abilities
            </Text>
            {this.props.abilities.map((ability, key) => (
              <Box color="black" key={key}>
                {ability.ability.name}
              </Box>
            ))}
          </Box>
          <Box color="white">
            <Text color="black" as="u">
              Types
            </Text>
            {this.props.types.map((type, key) => (
              <Box color="black">{type.type.name}</Box>
            ))}
          </Box>

          <Box color="black">
            <Text fontSize="2xl" color="black">
              {' '}
              Base Stats
            </Text>
            {this.props.stats.map((stat, key) => (
              <Flex flexDirection="row" key={key}>
                <Box
                  w="250px"
                  h="8
                9"
                >
                  <Text size="md" color="black">
                    {stat.stat.name}
                  </Text>
                  <Spacer />
                  <Progress
                    color="black"
                    hasStripe
                    value={stat.base_stat}
                    label={stat.base_stat}
                  />
                </Box>
              </Flex>
            ))}
          </Box>
        </Flex>
      </Container>
    );
  }
}

export default PokemonData;
