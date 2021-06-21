import styled from "styled-components";

export const BaseBtn = styled.button`
  background-color: ${(props) => props.theme.login.btnBgColor};
  color: ${(props) => props.theme.login.btnFontColor};
  cursor: pointer;
  text-align: center;
  padding: 13px 25px;
  transition: all 0.5s ease;
  border-radius: 5px;
`;

export const BaseLine = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 10px;
`;

export const BaseWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px 0;
`;

export const BaseAvatar = styled.div`
  width: 150px;
  height: 150px;
  margin-right: 50px;
  border-radius: 50%;
`;
