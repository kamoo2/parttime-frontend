import styled from "styled-components";

const SContent = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-gap: 1.5rem;
  margin-bottom: 100px;
`;

const TitleBox = styled.div`
  grid-column: 1/2;
  font-size: 28px;
`;
const FormBox = styled.div`
  grid-column: 2/4;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 0px 0px 25px 3px ${(props) => props.theme.login.shadowColor};
  border-radius: 5px;
  overflow: hidden;
`;

const Content = ({ children, title }) => {
  return (
    <SContent>
      <TitleBox>{title}</TitleBox>
      <FormBox>{children}</FormBox>
    </SContent>
  );
};

export default Content;
