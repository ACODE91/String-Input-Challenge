import React from 'react';
import { Link } from 'react-router-dom';

function Display(props) {
  const list = props.list.map(str => <div className="string" key={str._id}>{str.input}</div>);

  return (
    <div id="string-container">
      <Link to="/">Back to Input</Link>
      {list}
    </div>
  );
}

export default Display;
