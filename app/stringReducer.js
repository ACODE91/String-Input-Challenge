function stringReducer(
  state = {
    strings: [],
  },
  action,
) {
  switch (action.type) {
    case 'FETCH_STRINGS_SUCCESS':
      return Object.assign({}, state, {
        strings: action.payload,
      });
    default:
      return state;
  }
}

export default stringReducer;
