import React from 'react';

function Input(props) {
  return (
    <div>
      Input string:{' '}
      <input
        type="text"
        onChange={e => {
          props.typeFn(e);
        }}
      />
      <input
        type="button"
        value="Submit"
        onClick={e => {
          props.clickFn(e);
        }}
      />
    </div>
  );
}

export default Input;
