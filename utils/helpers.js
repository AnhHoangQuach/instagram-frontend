export const getHashTag = (value) => {
  const result = value.match(/(#[a-z\d-]+)/g);
  return result && result.map((item) => item.replace('#', ''));
};

export const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'http://hippo-instagram.herokuapp.com';
