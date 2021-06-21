import styled from "styled-components";

const SFormError = styled.span`
  color: #ff4500;
  font-weight: 600;
  font-size: 13px;
  margin-top: 5px;
`;
const FormError = ({ message }) => {
  return message ? <SFormError>{message}</SFormError> : null;
};

export default FormError;
