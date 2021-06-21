import styled from "styled-components";
import { Loader } from "../Loader";

const SButton = styled.button`
  width: 100%;
  padding: 15px 0;
  border-radius: 5px;
  margin-top: 20px;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.login.disableBtnBgColor
      : props.theme.login.btnBgColor};
  color: ${(props) =>
    props.disabled
      ? props.theme.login.disableBtnFontColor
      : props.theme.login.btnFontColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Button = ({ ...props }) => {
  const { value, type, load } = props;
  return <SButton type={type}>{load ? <Loader /> : value}</SButton>;
};
export default Button;
