import { makeVar } from "@apollo/client";
import { DARK_MODE, LOGIN_MODE, TOKEN } from "../constants";
import routes from "../routes";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const loginModeVar = makeVar(true);

export const logIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logOut = (history) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  history.replace(routes.home, null);
};

export const disableLoginMode = () => {
  localStorage.removeItem(LOGIN_MODE);
  loginModeVar(false);
};

export const enableLoginMode = () => {
  localStorage.setItem(LOGIN_MODE, "enable");
  loginModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enable");
  darkModeVar(true);
};
