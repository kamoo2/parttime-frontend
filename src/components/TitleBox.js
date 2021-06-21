import styled from "styled-components";
import { RubikFont } from "../fonts";
import SubTitle from "./auth/SubTitle";

const STitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 70px 0 100px;
`;
const Title = styled(RubikFont)`
  font-size: ${(props) => props.titleSize};
  text-align: center;
  color: ${(props) => props.theme.login.FontColor};
  transition: all 0.1s ease;
`;

const TitleBox = ({ title, subtitle, titleSize, subSize }) => {
  return (
    <STitleBox>
      <Title titleSize={titleSize}>{title}</Title>
      <SubTitle subSize={subSize}>{subtitle}</SubTitle>
    </STitleBox>
  );
};

export default TitleBox;
