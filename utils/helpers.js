export const getHashTag = (value) => {
  const result = value.match(/(#[a-z\d-]+)/g);
  return result && result.map((item) => item.replace('#', ''));
};
