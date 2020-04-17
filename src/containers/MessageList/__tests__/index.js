import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MessageList from '../';

configure({ adapter: new Adapter() });

describe('MessageList', () => {
  it('should render correctly with no props', () => {
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

    const component = mount(
      <MemoryRouter keyLength={0}>
        <MessageList />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
