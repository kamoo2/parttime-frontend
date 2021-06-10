import styled from "styled-components";
import { BaseLine } from "../../shared";

const ActiveLine = styled(BaseLine)`
  border: 2px solid ${(props) => props.theme.borderColor};
`;

export default ActiveLine;
