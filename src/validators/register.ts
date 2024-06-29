const validateFullName = (fullName: string): boolean => {
  if (!fullName || fullName.length < 5 ) {
    return false;
  }
  return true;
};

const validatePassword = (password: string): boolean => {
  if (
    !password ||
    password.length < 8 ||
    !/[a-zA-Z]/.test(password) ||
    !/\d/.test(password)
  ) {
    return false;
  }
  return true;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export { validateFullName, validatePassword, validateEmail };
