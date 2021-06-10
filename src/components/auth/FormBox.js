import styled from "styled-components";

const SFormBox = styled.div`
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const FormBox = ({ children }) => {
  return <SFormBox>{children}</SFormBox>;
};
export default FormBox;
