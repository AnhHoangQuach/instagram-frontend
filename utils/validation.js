export const validateEmail = (email) => {
  if (
    !email ||
    !email.match(
      //eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return 'Enter a valid email address.';
  }
  return true;
};

export const validateFullName = (fullName) => {
  if (!fullName) {
    return 'Enter a valid name.';
  }
  return true;
};

export const validateUsername = (username) => {
  if (!username) {
    return 'Enter a valid username.';
  } else if (username.length > 30 || username.length < 3) {
    return 'Please choose a username between 3 and 30 characters.';
    //eslint-disable-next-line
  } else if (!username.match(/^[a-zA-Z0-9\_.]+$/)) {
    return 'A username can only contain the following: letters A-Z, numbers 0-9 and the symbols _ . ';
  }
  return true;
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Enter a valid password.';
  } else if (password.length < 6) {
    return 'For security purposes we require a password to be at least 6 characters.';
  } else if (!password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/)) {
    return 'A password needs to have at least one uppercase letter, one lowercase letter, one special character and one number.';
  }
  return true;
};

export const validateBio = (bio) => {
  if (bio.length > 130) {
    return 'Your bio has to be 120 characters or less.';
  }
  return true;
};

export const validateWebsite = (website) => {
  if (
    website &&
    !website.match(
      //eslint-disable-next-line
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    )
  ) {
    return 'Please provide a valid website.';
  }
  return true;
};

export const convertHashTag = (text) => {
  var repl = text.replace(/#(\w+)/g, '<a href="#">#$1</a>');
  return repl;
};
