import gql from "graphql-tag";

export const MUTATION_CREATE_STORE = gql`
  mutation createStore(
    $store: String!
    $storeNumber: String!
    $category: String!
    $rule: String!
    $holiday: String!
    $files: [Upload!]!
  ) {
    createStore(
      store: $store
      storeNumber: $storeNumber
      category: $category
      rule: $rule
      holiday: $holiday
      files: $files
    ) {
      store {
        id
        store
        storeNumber
        photos {
          id
          photoURL
        }
      }
      ok
      error
    }
  }
`;

export const MUTATION_DELETE_STORE = gql`
  mutation deleteStore($id: Int!) {
    deleteStore(id: $id) {
      ok
      error
    }
  }
`;

export const CREATE_DAILY_SAIL_MUTATION = gql`
  mutation createDailySail($storeId: Int!, $sail: Int!) {
    createDailySail(storeId: $storeId, sail: $sail) {
      ok
      error
    }
  }
`;

export const DELETE_DAILY_SAIL_MUTATION = gql`
  mutation deleteDailySail($sailId: Int!) {
    deleteDailySail(sailId: $sailId) {
      ok
      error
    }
  }
`;
