import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MessageList from '..';

configure({ adapter: new Adapter() });

describe('MessageList', () => {
  const initialState = {
    loading: { isLoading: false },
    prefectureMessage: { listdata: [] },
  };
  const mockStore = configureStore();
  let store;

  it('should render correctly', () => {
    store = mockStore(initialState);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    //Mock canvas (used by antd)
    window.HTMLCanvasElement.prototype.getContext = () => {
      return {};
    };

    const component = mount(
      <Provider store={store}>
        <MemoryRouter keyLength={0}>
          <MessageList />
        </MemoryRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
