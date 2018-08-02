import React from 'react';
import { connect } from 'react-redux';
import Selector from '../../containers/App/selectors';

function Selected(props) {
  const helpIdGenerator = () => {
    const uuidv4 = require('uuid/v4');
    return uuidv4();
  };

  const list = props.submittedStrings.map(str => (
    <input key={helpIdGenerator()} value={str.savedString} type="submit" />
  ));

  return (
    <div>
      <div>Displaying selected posts...</div>
      {props.submittedStrings ? list : <div />}
    </div>
  );
}

const mapStateToProps = state => ({
  strings: Selector(state),
});

export default connect(mapStateToProps)(Selected);
