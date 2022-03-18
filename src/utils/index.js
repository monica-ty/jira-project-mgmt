export const isFalsy = (value) => (value === 0 ? false : !value);
// Do not change the input object in a function
// Objects are reference, the object will change also outside the function
// People do not expect that
export const cleanObject = (object) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
