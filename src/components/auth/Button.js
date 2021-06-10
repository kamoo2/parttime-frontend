import styled from "styled-components";

const Button = styled.input`
  width: 100%;
  padding: 15px 0;
  border-radius: 5px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.login.btnBgColor};
  color: ${(props) => props.theme.login.btnFontColor};
  text-align: center;
  font-size: 20px;
  transition: all 0.5s ease;
`;
export default Button;
