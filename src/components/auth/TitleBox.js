import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { isLoggedInVar } from "../../apollo";
import { RubikFont } from "../../fonts";

const STitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 70px 0 100px;
`;
const Title = styled(RubikFont)`
  font-size: 25px;
  color: ${(props) => props.theme.login.rFontColor};
  transition: all 0.1s ease;
`;
const SubTitle = styled.span`
  margin-top: 10px;
  font-size: 12px;
  font-weight: 100;
  color: ${(props) => props.theme.login.rFontColor};
  transition: all 0.1s ease;
`;

const TitleBox = ({ title, subtitle }) => {
  return (
    <STitleBox>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </STitleBox>
  );
};

export default TitleBox;
