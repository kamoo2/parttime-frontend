import styled from "styled-components";
import { TiDelete } from "react-icons/ti";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT_MUTATION } from "../apollo/mutation/comment";
import { SEE_COMMENTS_QUERY } from "../apollo/queries/comment";
import { QUERY_SEE_STORE } from "../apollo/queries/store";
const SComment = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
`;

const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-image: url(${(props) => props.url});
  background-size: cover;
`;
const Name = styled.h4`
  font-size: 20px;
  margin: 0 20px;
`;
const TextBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.h4``;
const DeleteBtn = styled.button`
  svg {
    font-size: 24px;
  }
`;
const Comment = ({ comment, storeId }) => {
  const [deleteCommentMutation, { loading }] = useMutation(
    DELETE_COMMENT_MUTATION,
    {
      variables: {
        id: comment.id,
      },
      refetchQueries: [
        { query: SEE_COMMENTS_QUERY, variables: { storeId } },
        { query: QUERY_SEE_STORE, variables: { id: storeId } },
      ],
    }
  );
  return (
    <SComment>
      <Avatar url={comment.user.avatarURL || "/images/avatar.png"}></Avatar>
      <Name>{comment.user.username}</Name>
      <TextBox>
        <Text>{comment.comment}</Text>
        {comment.isMine && (
          <DeleteBtn
            onClick={() => {
              if (loading) {
                return;
              }
              deleteCommentMutation();
            }}
          >
            <TiDelete />
          </DeleteBtn>
        )}
      </TextBox>
    </SComment>
  );
};
export default Comment;
