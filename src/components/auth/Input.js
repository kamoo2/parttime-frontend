import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px 0;
  font-size: 16px;
  color: ${(props) => props.theme.fontColor};
  border-bottom: 0.5px solid
    ${(props) => (props.hasError ? "#f53b57" : props.theme.borderColor)};
  transition: all 0.5s ease;
`;

export default Input;
