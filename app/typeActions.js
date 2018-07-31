export function typeString(string) {
  return {
    type: 'TYPE_STRING',
    payload: {
      savedString: string,
    },
  };
}
