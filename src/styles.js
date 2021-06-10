import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  bgColor: "#E0E3DA",
  fontColor: "#566270",
  activeColor: "#548687",
  borderColor: "#548687",
  darkButtonColor: "#f53b57",
  login: {
    lCardBgColor: "#548687",
    rCardBgColor: "#E0E3DA",
    lCardFontColor: "#E0E3DA",
    rCardFontColor: "#548687",
    btnBgColor: "#548687",
    btnFontColor: "#E0E3DA",
    shadowColor: "rgba(75,92,84,1)",
  },
};

export const darkTheme = {
  bgColor: "#282c36",
  fontColor: "#E0E3DA",
  activeColor: "#548687",
  borderColor: "#4834d4",
  darkButtonColor: "#fed330",
  login: {
    lCardBgColor: "#2c2c54",
    rCardBgColor: "#282c36",
    lCardFontColor: "#E0E3DA",
    rCardFontColor: "#E0E3DA",
    btnBgColor: "#4834d4",
    btnFontColor: "#E0E3DA",
    shadowColor: "rgba(0,0,0,1)",
  },
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input{
    all:unset;
  }
  button{
    all:unset;
  }
  body{
    background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.fontColor};
    transition: all 0.5s ease;
    font-size:14px;
    font-family: 'Noto Sans KR', sans-serif;
  }
  *{
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
    color:${(props) => props.theme.fontColor};
  }
`;
