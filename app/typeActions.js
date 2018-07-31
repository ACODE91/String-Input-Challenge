export function typeString(string) {
  console.log(string, 'from action')
  return {
    type: 'TYPE_STRING',
    payload: {
      savedString: string,
    },
  };
}
