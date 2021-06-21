import gql from "graphql-tag";

export const SEE_EMPLOYEES_QUERY = gql`
  query seeEmployees($storeId: Int!) {
    seeEmployees(storeId: $storeId) {
      id
      name
      age
      sex
      wage
      phoneNumber
      salary
      avatarURL
    }
  }
`;

export const SEE_EMPLOYEE_QUERY = gql`
  query seeEmployee($id: Int!) {
    seeEmployee(id: $id) {
      ok
      error
      employee {
        id
        name
        age
        wage
        sex
        phoneNumber
        salary
        avatarURL
        workdays {
          id
          year
          month
          day
          workTime {
            id
            time
          }
        }
      }
    }
  }
`;
