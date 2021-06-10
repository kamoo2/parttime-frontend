import { ApolloClient, makeVar } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { InMemoryCache } from "@apollo/client/cache";
const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";
const LOGIN_MODE = "LOGIN_MODE";
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const loginModeVar = makeVar(true);

export const logIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
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

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN) || "";
  return {
    headers: {
      ...headers,
      "jwt-token": token ? token : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});
