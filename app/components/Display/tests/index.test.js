import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import Display from '../Display';

describe('<Display />', () => {
  it('should display strings from props', () => {
    const renderedComponent = shallow(<Display />);

    renderedComponent.setProps({ list: ['a'] });
    expect(
      renderedComponent
        .find('.string')
        .text()
        .toBe('a'),
    ).toBe(true);
  });
});
