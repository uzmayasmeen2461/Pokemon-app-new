import React, { useState } from 'react';
import {
  FormControl,
  Image,
  FormLabel,
  Button,
  Input,
  Container,
  Flex,
  FormHelperText,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  state = {
    search: '',
    image: '',
  };

  add = e => {
    e.preventDefault();
    if (this.state.search === '') {
      alert('Please type a valid name!');
      return;
    }

    this.props.addPokemonHandler(this.state);
    this.setState({ search: '' });
    // this.props.history.push('/list');
  };

  render() {
    return (
      <Container>
        <FormControl id="search" onSubmit={this.add}>
          <FormLabel>Search for a Pokemon</FormLabel>
          <Input
            value={this.state.search}
            type="text"
            placeholder="type a pokemon name"
            onChange={e => this.setState({ search: e.target.value })}
          />

          <FormHelperText>Ex,Pikachu,lapras,ditto,treecko</FormHelperText>
          <Flex justify="space-around" margin="15px">
            <Button
              colorScheme="blue"
              onClick={e => this.props.getPokemon(this.state.search)}
            >
              Search
            </Button>

            <Button colorScheme="blue" onClick={this.add}>
              AddToList
            </Button>

            <Link to="/list">
              <Button colorScheme="green">Go to MyList</Button>
            </Link>
          </Flex>
        </FormControl>
      </Container>
    );
  }
}
export default Search;
