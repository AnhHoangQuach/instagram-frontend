export const getHashTag = (value) => {
  return value.match(/(^|\s)(#[a-z\d-]+)/g);
};
