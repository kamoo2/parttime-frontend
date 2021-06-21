import styled from "styled-components";

const SubTitle = styled.span`
  margin-top: 10px;
  font-size: ${(props) => props.subSize};
  font-weight: 100;
  text-align: center;
  color: ${(props) => props.theme.login.FontColor};
  transition: all 0.1s ease;
`;

export default SubTitle;
