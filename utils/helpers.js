export const getHashTag = (value) => {
  const result = value.match(/(#[a-z\d-]+)/g);
  return result && result.map((item) => item.replace('#', ''));
};

export const baseUrl =
  process.env.NODE_ENV === 'production' // localhost is development
    ? 'http://localhost:5000'
    : 'https://howling-cheateau-40911.herokuapp.com';

export const newMsgSound = (senderName) => {
  const sound = new Audio('/assets/sound/light.mp3');

  sound && sound.play();

  if (senderName) {
    document.title = `New message from ${senderName}`;

    if (document.visibilityState === 'visible') {
      setTimeout(() => {
        document.title = 'Messages';
      }, 5000);
    }
  }
};
