import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadPokemonById } from '../../redux/actions/pokeActions';
import configureStore from '../../redux/configureStore';
import PokemonDetail from './PokemonDetail';

jest.mock('../../redux/actions/pokeActions');

describe('PokemonDetail tests', () => {
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

  test('Should render loading when loading is true', () => {
    const initialState = {
      pokeReducer: {
        loading: true,
      },
    };
    wrapper = wrapperFactory(initialState);

    render(<PokemonDetail />, { wrapper });

    expect(document.querySelector('.loading-container')).toBeInTheDocument();
  });

  test('Should render error msg when there is an error loading the pokemon', () => {
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

  test('Should render pokemon-detail', () => {
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

  describe('UseEffect test', () => {});
  test('Should dispatch loadPokemonById', () => {
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

    expect(store.dispatch).toHaveBeenCalled();
  });
});
