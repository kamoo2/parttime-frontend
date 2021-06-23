import gql from "graphql-tag";

export const SEE_COMMENTS_QUERY = gql`
  query seeComments($storeId: Int!) {
    seeComments(storeId: $storeId) {
      id
      comment
      isMine
      user {
        id
        username
        avatarURL
      }
    }
  }
`;
