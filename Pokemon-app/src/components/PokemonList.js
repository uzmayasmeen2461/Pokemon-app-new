import React, { useEffect } from 'react';
import { Container, Text, Button, Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';

function PokemonList(props) {
  const deleteHandler = id => {
    props.removeHandler(id);
  };

  const renderList = props.listItems.map(listItem => {
    return (
      <PokemonCard
        listItem={listItem}
        clickHandler={deleteHandler}
        key={listItem.id}
        image={props.image}
      />
    );
  });

  return (
    <Container>
      <Text>My List</Text>
      <Link to="/">
        <Button>Search for Pokemon</Button>
      </Link>

      <Box>{renderList}</Box>
    </Container>
  );
}

export default PokemonList;
