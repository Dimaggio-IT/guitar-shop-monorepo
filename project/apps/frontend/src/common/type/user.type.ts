type TUserId = string;

type TAuthData = {
  email: string;
  password: string;
};

type TAuthResponse = {
  id: string;
  email: string;
  login: string;
  accessToken: string;
};

type TRegResponse = {
  id: string;
  email: string;
  login: string;
  registrationDate: string;
};

type TRegData = {
  email: string;
  login: string;
  password: string;
}

export {
  type TUserId,
  type TAuthResponse,
  type TAuthData,
  type TRegData,
  type TRegResponse,
};
