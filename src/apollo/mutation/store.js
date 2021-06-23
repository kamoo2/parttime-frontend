import gql from "graphql-tag";

export const CREATE_STORE_MUTATION = gql`
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
      }
      ok
      error
    }
  }
`;

export const UPDATE_STORE_MUTATION = gql`
  mutation updateStore(
    $id: Int!
    $store: String
    $storeNumber: String
    $files: [Upload]
    $category: String
    $holiday: String
    $rule: String
  ) {
    updateStore(
      id: $id
      store: $store
      storeNumber: $storeNumber
      files: $files
      category: $category
      holiday: $holiday
      rule: $rule
    ) {
      ok
      error
      newStore {
        id
        store
      }
    }
  }
`;

export const DELETE_STORE_MUTATION = gql`
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

export const LIKE_STORE_MUTATION = gql`
  mutation likeStore($id: Int!) {
    likeStore(id: $id) {
      ok
      error
    }
  }
`;
