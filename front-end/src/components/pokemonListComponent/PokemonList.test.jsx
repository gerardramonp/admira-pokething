import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { filterPokemonByName, fillDisplayPokemonList } from '../../redux/actions/pokeActions';
import configureStore from '../../redux/configureStore';
import PokemonList from './PokemonList';

jest.mock('../../redux/actions/pokeActions');

describe('PokemonList Component tests', () => {
  let wrapper = null;
  let store = null;
  const wrapperFactory = (wrapperInitialState) => {
    store = configureStore(wrapperInitialState);
    store.dispatch = jest.fn();

    return ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  };

  afterEach(() => {
    jest.restoreAllMocks();
    wrapper = null;
  });

  test('Should render title__container ', () => {
    const initialState = { pokeReducer: {} };
    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    expect(document.querySelector('.title__container')).toBeInTheDocument();
  });

  test('Should render loading-container when loading is true ', () => {
    const initialState = { pokeReducer: { loading: true } };
    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    expect(document.querySelector('.loading-container')).toBeInTheDocument();
  });

  test('Should render pokemon-list when loading is false & there is a pokemon List ', () => {
    const initialState = { pokeReducer: { pokemonList: [{ id: 1, name: 'pikachu' }] } };
    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    expect(document.querySelector('.pokemon-list')).toBeInTheDocument();
  });

  test('Should render pokemon-list with items when having a displayPokemonList ', () => {
    const initialState = {
      pokeReducer: {
        pokemonList: [{ id: 1, name: 'pikachu' }],
        displayPokemonList: [
          {
            id: 1,
            name: 'pikachu',
            types: [{ type: { name: 'electric' } }],
            sprites: { front_default: 'url' },
          },
        ],
      },
    };
    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    expect(document.querySelector('.pokemon__name').innerHTML).toBe('pikachu');
  });

  test('Should execute handleChange and call filterPokemonByName when searching with 3 or more characters', () => {
    const initialState = {
      pokeReducer: {
        pokemonList: [{ id: 1, name: 'pikachu' }],
        displayPokemonList: [
          {
            id: 1,
            name: 'pikachu',
            types: [{ type: { name: 'electric' } }],
            sprites: { front_default: 'url' },
          },
        ],
      },
    };
    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    const searchInput = document.querySelector('.screen__input');

    fireEvent.change(searchInput, { target: { value: 'random' } });

    expect(filterPokemonByName).toHaveBeenCalled();
  });

  test('Should execute handleChange and call fillDisplayPokemonList when searching with less than 3 characters', () => {
    const initialState = {
      pokeReducer: {
        pokemonList: [{ id: 1, name: 'pikachu' }],
        displayPokemonList: [
          {
            id: 1,
            name: 'pikachu',
            types: [{ type: { name: 'electric' } }],
            sprites: { front_default: 'url' },
          },
        ],
      },
    };
    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    const searchInput = document.querySelector('.screen__input');

    fireEvent.change(searchInput, { target: { value: 'as' } });

    expect(fillDisplayPokemonList).toHaveBeenCalled();
  });

  test('Should execute handleClick and call fillDisplayPokemonList when clicking a pokemon card', () => {
    const initialState = {
      pokeReducer: {
        pokemonList: [{ id: 1, name: 'pikachu' }],
        displayPokemonList: [
          {
            id: 1,
            name: 'pikachu',
            types: [{ type: { name: 'electric' } }],
            sprites: { front_default: 'url' },
          },
        ],
      },
    };
    wrapper = wrapperFactory(initialState);

    render(<PokemonList />, { wrapper });

    const linkElement = document.querySelector('.link');

    fireEvent.click(linkElement);

    expect(fillDisplayPokemonList).toHaveBeenCalled();
  });
});
