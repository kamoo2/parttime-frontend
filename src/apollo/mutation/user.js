import gql from "graphql-tag";

export const MUTATION_LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export const MUTATION_CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      name: $name
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $username: String
    $name: String
    $phoneNumber: String
    $email: String
    $file: Upload
  ) {
    editProfile(
      username: $username
      name: $name
      phoneNumber: $phoneNumber
      email: $email
      file: $file
    ) {
      avatarURL
      id
      ok
      error
    }
  }
`;

export const MUTATION_DELETE_ACCOUNT = gql`
  mutation deleteAccount {
    deleteAccount {
      ok
      error
    }
  }
`;
