import gql from "graphql-tag";

export const CREATE_WORKDAY_MUTATION = gql`
  mutation createWorkday(
    $year: Int!
    $month: Int!
    $day: Int!
    $workTime: Int!
    $employeeId: Int!
  ) {
    createWorkday(
      year: $year
      month: $month
      day: $day
      workTime: $workTime
      employeeId: $employeeId
    ) {
      ok
      error
    }
  }
`;
