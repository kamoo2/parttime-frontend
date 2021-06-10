import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 730px;
  max-width: 1000px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 25px 3px ${(props) => props.theme.login.shadowColor};
`;

export default Container;
