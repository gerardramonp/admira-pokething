import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header component test', () => {
  let wrapper = null;
  const wrapperFactory = () => ({ children }) => (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );

  afterEach(() => {
    jest.restoreAllMocks();
    wrapper = null;
  });

  test('Should render header', () => {
    wrapper = wrapperFactory();

    render(<Header />, { wrapper });

    expect(document.querySelector('.header')).toBeInTheDocument();
  });

  test('Should have 3 sections', () => {
    wrapper = wrapperFactory();

    render(<Header />, { wrapper });

    expect(document.getElementsByClassName('header__item').length).toBe(3);
  });
});
