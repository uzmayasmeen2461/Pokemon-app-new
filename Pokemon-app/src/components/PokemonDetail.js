import React, { useEffect } from 'react';
import { Container, Text, Button, Image, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function PokemonDetail(props) {
  console.log(props);
  const { id, search } = props.location.state.listItem;
  const image = props.image;
  return (
    <Container>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
      <Flex justify="center" align="center">
        <Text
          marginTop="20%"
          textAlign="center"
          fontSize="6xl"
          color="rgba(193, 89, 71, 0.8)"
          textShadow="2px 2px 5px red"
        >
          {search}
        </Text>

        <Image src={image} alt={search}></Image>
      </Flex>
    </Container>
  );
}

export default PokemonDetail;
