import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { darkModeVar } from "../apollo/vars";
import { BaseAvatar } from "./shared";

const YesAvatar = styled(BaseAvatar)`
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
`;

const NoAvatar = styled.img`
  width: 150px;
  height: 150px;
  margin-right: 50px;
  border-radius: 50%;
`;

const Avatar = ({ url, exist }) => {
  console.log(exist);
  console.log(url);
  const isDarkMode = useReactiveVar(darkModeVar);
  return exist ? (
    <YesAvatar url={url} />
  ) : (
    <NoAvatar
      src={isDarkMode ? "/images/dark_avatar.png" : "/images/avatar.png"}
    />
  );
};

export default Avatar;
