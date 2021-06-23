import { ApolloClient } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { InMemoryCache } from "@apollo/client/cache";
import { TOKEN } from "../constants";

const uploadLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://kamoo-parttime-management.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN) || "";
  return {
    headers: {
      ...headers,
      "jwt-token": token,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});
