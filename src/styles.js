import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  bgColor: "#fffcf5",
  fontColor: "#014127",
  activeColor: "#014127",
  borderColor: "#014127",
  darkButtonColor: "#FF4500",
  login: {
    lCardBgColor: "#014127",
    rCardBgColor: "#fffcf5",
    CardFontColor: "#fffcf5",
    btnBgColor: "#014127",
    disableBtnBgColor: "rgba(1, 65, 39,0.5)",
    btnFontColor: "#fffcf5",
    disableBtnFontColor: "rgba(255, 252, 245,0.3)",
    shadowColor: "rgba(75,92,84,1)",
  },
  home: {
    cardHeaderBgColor: "#014127",
    cardHeaderFontColor: "#fffcf5",
  },
};

export const darkTheme = {
  bgColor: "#2C2F32",
  fontColor: "#fffcf5",
  activeColor: "#014127",
  borderColor: "#4b3b76",
  darkButtonColor: "#fed330",
  login: {
    lCardBgColor: "#4b3b76",
    rCardBgColor: "#2C2F32",
    FontColor: "#fffcf5",
    btnBgColor: "#4b3b76",
    disableBtnBgColor: "rgba(75, 59, 118,0.5)",
    disableBtnFontColor: "rgba(255, 252, 245,0.3)",
    btnFontColor: "#fffcf5",
    shadowColor: "rgba(0,0,0,1)",
  },
  home: {
    cardHeaderBgColor: "#4b3b76",
    cardHeaderFontColor: "#fffcf5",
  },
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input{
    all:unset;
  }
  button{
    all:unset;
    cursor:pointer;
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
