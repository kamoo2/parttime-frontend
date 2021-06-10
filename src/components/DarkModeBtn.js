import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import { HiMoon, HiSun } from "react-icons/hi";
const SDarkModeBtn = styled.button`
  cursor: pointer;
  height: 50px;
  width: 50px;
  color: ${(props) => props.theme.darkButtonColor};
  transition: all 0.5s ease;
`;

const DarkModeBtn = () => {
  const darkMode = useReactiveVar(darkModeVar);
  const changeTheme = () => {
    if (darkMode) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  };

  const icon = darkMode ? <HiMoon size={30} /> : <HiSun size={30} />;
  return <SDarkModeBtn onClick={() => changeTheme()}>{icon}</SDarkModeBtn>;
};

export default DarkModeBtn;
