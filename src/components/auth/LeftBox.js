import styled from "styled-components";

const LeftBox = styled.div`
  width: 50%;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.login.lCardBgColor};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: all 0.5s ease;
`;

export default LeftBox;
