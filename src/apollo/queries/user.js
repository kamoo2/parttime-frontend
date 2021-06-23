import gql from "graphql-tag";

export const SEE_PROFILE_QUERY = gql`
  query seeProfile($id: Int!) {
    seeProfile(id: $id) {
      ok
      error
      user {
        id
        username
        name
        phoneNumber
        avatarURL
        email
        total_stores
      }
    }
  }
`;
