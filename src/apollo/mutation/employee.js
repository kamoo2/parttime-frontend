import gql from "graphql-tag";

export const CREATE_EMPLOYEE_MUTATION = gql`
  mutation createEmployee(
    $name: String!
    $age: Int!
    $wage: Int!
    $sex: String!
    $phoneNumber: String!
    $storeId: Int!
    $file: Upload
  ) {
    createEmployee(
      name: $name
      age: $age
      wage: $wage
      sex: $sex
      phoneNumber: $phoneNumber
      storeId: $storeId
      file: $file
    ) {
      ok
      error
    }
  }
`;

export const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation updateEmployee(
    $id: Int!
    $name: String
    $age: Int
    $wage: Int
    $sex: String
    $phoneNumber: String
    $file: Upload
  ) {
    updateEmployee(
      id: $id
      name: $name
      age: $age
      wage: $wage
      sex: $sex
      phoneNumber: $phoneNumber
      file: $file
    ) {
      ok
      error
    }
  }
`;

export const DELETE_EMPLOYEE_MUTATION = gql`
  mutation deleteEmployee($id: Int!, $storeId: Int!) {
    deleteEmployee(id: $id, storeId: $storeId) {
      ok
      error
    }
  }
`;
