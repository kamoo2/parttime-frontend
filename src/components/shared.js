import styled from "styled-components";

export const BaseBtn = styled.button`
  background-color: ${(props) => props.theme.login.btnBgColor};
  color: ${(props) => props.theme.login.btnFontColor};
  text-align: center;
  transition: all 0.5s ease;
`;

export const BaseLine = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 10px;
`;
