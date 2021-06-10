import styled from "styled-components";

const SFieldName = styled.span`
  font-size: 16px;
  :first-child {
    margin-top: 0;
  }
  margin-top: 30px;
`;

const FieldName = ({ name }) => {
  return <SFieldName>{name}</SFieldName>;
};

export default FieldName;
