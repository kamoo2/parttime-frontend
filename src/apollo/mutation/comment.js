import gql from "graphql-tag";

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($storeId: Int!, $comment: String!) {
    createComment(storeId: $storeId, comment: $comment) {
      ok
      error
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`;
