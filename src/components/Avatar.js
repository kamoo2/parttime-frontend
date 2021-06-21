import styled from "styled-components";
import { BaseAvatar } from "./shared";

const YesAvatar = styled(BaseAvatar)`
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
`;

const NoAvatar = styled(BaseAvatar)`
  background-color: gray;
`;

const Avatar = ({ url, exist }) => {
  return exist ? <YesAvatar url={url} /> : <NoAvatar />;
};

export default Avatar;
