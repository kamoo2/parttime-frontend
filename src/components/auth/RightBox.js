import styled from "styled-components";

const RightBox = styled.div`
  width: 50%;
  background-color: ${(props) => props.theme.login.rCardBgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export default RightBox;
