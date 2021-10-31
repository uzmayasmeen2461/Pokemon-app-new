import React from 'react';
import { Icon } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { Container, Flex, Text } from '@chakra-ui/react';

function PokemonCard(props) {
  console.log(props);
  const { image } = props.image;
  const { id, search } = props.listItem;
  return (
    <Container>
      <Flex
        margin="20px"
        justify="space-between"
        border="1px solid"
        padding="10px"
      >
        <Link
          to={{
            pathname: `/listItem/${id}`,
            state: { listItem: props.listItem },
            image: { image },
          }}
        >
          <Text fontSize="2xl">{search}</Text>
        </Link>
        <Icon
          as={DeleteIcon}
          margin-left="100px"
          onClick={() => props.clickHandler(id)}
        />
      </Flex>
    </Container>
  );
}

export default PokemonCard;
