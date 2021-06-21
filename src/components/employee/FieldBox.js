import styled from "styled-components";

const SFieldBox = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const FieldName = styled.span`
  background-color: ${(props) => props.theme.login.btnBgColor};
  color: ${(props) => props.theme.login.btnFontColor};
  border-radius: 2px;
  width: 70px;
  display: block;
  padding: 5px 0;
  text-align: center;
  margin-right: 20px;
`;
const Field = styled.span`
  font-size: ${(props) => (props.accent ? "20px" : "14px")};
`;

const FieldBox = ({ name, value, accent = false }) => {
  return (
    <SFieldBox>
      <FieldName>{name}</FieldName>
      <Field accent={accent}>{value}</Field>
    </SFieldBox>
  );
};

export default FieldBox;
