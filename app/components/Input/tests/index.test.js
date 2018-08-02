import React from 'react';
import { shallow } from 'enzyme';
import Input from 'components/Input';
import { FormattedMessage } from 'react-intl';

describe('<Input />', () => {
  it('should render the component', () => {
    const renderedComponent = shallow(<Footer />);
    expect(
      renderedComponent.contains(
        <section>
          <FormattedMessage {...messages.licenseMessage} />
        </section>,
      ),
    ).toBe(true);
  });
});
