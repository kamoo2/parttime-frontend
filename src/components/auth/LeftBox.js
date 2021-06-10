import styled from "styled-components";

const LeftBox = styled.div`
  width: 50%;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.login.lCardBgColor};
  transition: all 0.5s ease;
`;

export default LeftBox;
