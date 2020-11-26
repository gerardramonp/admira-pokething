import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { filterPokemonByName, fillDisplayPokemonList } from '../../redux/actions/pokeActions';
import configureStore from '../../redux/configureStore';
import PokemonDetail from './PokemonDetail';

jest.mock('../../redux/actions/pokeActions');

describe('PokemonDetail tests', () => {
  let wrapper = null;

  const wrapperFactory = (wrapperInitialState) => {
    const store = configureStore(wrapperInitialState);
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

  it('Should render loading when loading is true', () => {
    const initialState = {
      pokeReducer: {
        loading: true,
      },
    };
    wrapper = wrapperFactory(initialState);

    render(<PokemonDetail />, { wrapper });

    expect(document.querySelector('.loading-container')).toBeInTheDocument();
  });

  it('Should render error msg when there is an error loading the pokemon', () => {
    const initialState = {
      pokeReducer: {
        error: 'ErrorCode & things',
      },
    };
    wrapper = wrapperFactory(initialState);

    render(<PokemonDetail />, { wrapper });

    expect(document.querySelector('.error__msg').innerHTML)
      .toBe('There has been an error loading the pokemon');
  });

  it('Should render pokemon-detail', () => {
    const initialState = {
      pokeReducer: {
        pokemonDetail: {
          id: 1,
          name: 'bulbasaur',
          types: [{
            type: {
              name: 'grass',
            },
          }],
          sprites: { front_default: 'url', back_default: 'url' },
          stats: [{ stat: { name: 'name' } }],
        },
      },
    };
    wrapper = wrapperFactory(initialState);

    render(<PokemonDetail />, { wrapper });

    expect(document.querySelector('.pokemon-detail')).toBeInTheDocument();
  });
});
