import configureStore from './configureStore';

describe('ConfigureStore tests', () => {
  test('Should create an store', () => {
    const store = configureStore();

    expect(store).toBeDefined();
  });
});
