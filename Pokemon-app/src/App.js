import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, theme, Spinner } from '@chakra-ui/react';
import Search from './components/Search';
import { fetchPokemon } from './services/Api';
import Api from './services/Api';
import PokemonList from './components/PokemonList';
import PokemonData from './components/PokemonData';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { uuid } from 'uuidv4';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PokemonDetail from './components/PokemonDetail';

function App() {
  const [pokemon, setPokemon] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [image, setImage] = useState([]);
  const [listItems, setListItems] = useState([]);
  const LOCAL_STORAGE_KEY = 'listItems';
  const getPokemon = async query => {
    if (!query) {
      setError(true);
      alert('invalid entry');
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      const response = await fetchPokemon(query);
      const results = await response.json();
      // console.log(results);
      setPokemon(results);
      setImage([...image, results.sprites.front_default]);

      setLoading(false);
    }, 1500);
  };

  const addPokemonHandler = async listItem => {
    if (listItems.length < 6 && listItem !== null) {
      const request = { id: uuid(), ...listItem };
      const response = await Api.post('/listItems', request);
      setListItems([...listItems, response.data]);
    } else {
      alert('only 6 pokemons allowed per person');
    }
  };

  const retrieveItems = async () => {
    const response = await Api.get('/listItems');
    return response.data;
  };
  const removeHandler = async id => {
    await Api.delete(`/listItems/${id}`);
    const newList = listItems.filter(item => {
      return item.id !== id;
    });
    setListItems(newList);
  };

  useEffect(() => {
    // const retrivedValues = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY, JSON.stringify(listItems))
    // );
    // if (retrivedValues) setListItems(retrivedValues);
    const getItems = async () => {
      const allItems = await retrieveItems();
      if (allItems) setListItems(allItems);
    };
    getItems();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listItems));
  }, [listItems]);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        {/* <Grid minH="100vh"> */}
        <ColorModeSwitcher justifySelf="flex-end" />
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Search
                  {...props}
                  getPokemon={getPokemon}
                  addPokemonHandler={addPokemonHandler}
                />
              )}
            />

            <Route
              path="/list"
              exact
              render={props => (
                <PokemonList
                  {...props}
                  listItems={listItems}
                  image={image}
                  getPokemon={getPokemon}
                  removeHandler={removeHandler}
                />
              )}
            />
            <Route
              path="/listItem/:id"
              render={props => <PokemonDetail {...props} image={image} />}
            />
          </Switch>
        </Router>

        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : null}
        {!loading && pokemon ? (
          <PokemonData
            name={pokemon.name}
            sprite={pokemon.sprites.front_default}
            abilities={pokemon.abilities}
            stats={pokemon.stats}
            types={pokemon.types}
          />
        ) : null}

        {/* </Grid> */}
      </Box>
    </ChakraProvider>
  );
}

export default App;
