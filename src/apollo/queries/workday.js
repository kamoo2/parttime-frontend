import gql from "graphql-tag";

export const SEE_WORKDAYS_QUERY = gql`
  query seeWorkdays($employeeId: Int!) {
    seeWorkdays(employeeId: $employeeId) {
      id
      year
      month
      workTime {
        id
        time
      }
      day
    }
  }
`;
