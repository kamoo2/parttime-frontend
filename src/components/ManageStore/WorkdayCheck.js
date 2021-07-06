import React from "react";
import styled from "styled-components";
import Calendar from "./Calendar";

const Wrapper = styled.div`
  padding: 20px 30px;
  background-color: ${(props) => props.theme.bgColor};
`;

const WorkdayCheck = ({ storeId, employeeId, name }) => {
  return (
    <Wrapper>
      <Calendar name={name} storeId={storeId} employeeId={employeeId} />
    </Wrapper>
  );
};

export default WorkdayCheck;
