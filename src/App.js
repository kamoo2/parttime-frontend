import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { client } from "./apollo/client";
import { darkModeVar, isLoggedInVar } from "./apollo/vars";
import { LoggedInRouter } from "./router/logged.in";
import { LoggedOutRouter } from "./router/logged.out";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import ReactNotification from "react-notifications-component";
import "reactjs-popup/dist/index.css";
import "react-notifications-component/dist/theme.css";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <ReactNotification />
          {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
