import gql from "graphql-tag";

export const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      name
      phoneNumber
      avatarURL
      email
      total_stores
    }
  }
`;
