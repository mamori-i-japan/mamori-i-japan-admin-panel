import React from 'react';
import { configure, shallow } from 'enzyme';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import Top from '../';

configure({ adapter: new Adapter() });

describe('Top', () => {
  it('should render correctly with no props', () => {
    const component = shallow(<Top />);

    expect(component).toMatchSnapshot();
  });

  // it('should render correctly content: "top"', () => {
  //   const { getByText } = render(<Top />);
  //   const linkElement = getByText(/top/i);

  //   expect(linkElement).toBeInTheDocument();
  // });
});
