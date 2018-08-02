import { TYPE_STRING } from '../app/typeActions.js';

export default function typeReducer(
  state = {
    savedString: '',
  },
  action,
) {
  switch (action.type) {
    case 'TYPE_STRING':
      return Object.assign({}, state, {
        savedString: action.payload,
      });
    default:
      return state;
  }
}
