import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import styled from "styled-components";
import { SEE_EMPLOYEES_QUERY } from "../../apollo/queries/employee";
import { Loader } from "../Loader";
import EmployeeCard from "./EmployeeCard";
import EmployeeForm from "./EmployeeForm";

const EmployeesContainer = styled.div`
  width: 100%;
  margin-top: 50px;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 30px;
  margin: 30px 0;
`;

const EmployeeCards = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PaddingWrap = styled.div`
  width: 50%;
  padding: 5px;
`;
const Employees = ({ storeId }) => {
  // props로 전달받아야 할 것들

  const [getEmployees, { data, loading }] = useLazyQuery(SEE_EMPLOYEES_QUERY, {
    variables: {
      storeId,
    },
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getEmployees();
    }
    return () => {
      isMounted = false;
    };
  }, [getEmployees]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <EmployeeForm storeId={storeId} />
      <EmployeesContainer>
        <Title>알바목록</Title>
        <EmployeeCards>
          {data?.seeEmployees?.map((emp) => {
            return (
              <PaddingWrap key={emp.id}>
                <EmployeeCard
                  id={emp.id}
                  name={emp.name}
                  age={emp.age}
                  phoneNumber={emp.phoneNumber}
                  sex={emp.sex}
                  wage={emp.wage}
                  avatarURL={emp.avatarURL}
                  list="true"
                  storeId={storeId}
                />
              </PaddingWrap>
            );
          })}
        </EmployeeCards>
      </EmployeesContainer>
    </>
  );
};

export default Employees;
