import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SEE_COMMENTS_QUERY } from "../apollo/queries/comment";
import Comment from "./Comment";
import { BiCommentCheck } from "react-icons/bi";
import { CREATE_COMMENT_MUTATION } from "../apollo/mutation/comment";
import { QUERY_SEE_STORE } from "../apollo/queries/store";

const Container = styled.div`
  width: 100%;
  padding: 16px;
  margin-top: 50px;
  border-radius: 5px;
  box-shadow: 0px 0px 25px 3px ${(props) => props.theme.login.shadowColor};
`;

const Title = styled.div`
  font-size: 24px;
`;

const Count = styled.h4`
  margin-top: 10px;
  font-size: 14px;
  color: lightgray;
  margin-bottom: 25px;
`;

const Inner = styled.div`
  margin-top: 25px;
  form {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    input {
      width: 100%;
      padding: 6px;
    }
    input:focus {
      border-bottom: 1px solid ${(props) => props.theme.login.btnBgColor};
    }
    button {
      width: 100px;
      text-align: center;
      padding: 8px 0;
      border-radius: 3px;
      background-color: ${(props) => props.theme.login.btnBgColor};
    }
  }
  svg {
    font-size: 24px;
    margin-right: 12px;
  }
`;
const Comments = ({ storeId, commentCount }) => {
  const [getComments, { data }] = useLazyQuery(SEE_COMMENTS_QUERY, {
    variables: {
      storeId,
    },
  });
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      refetchQueries: [
        { query: SEE_COMMENTS_QUERY, variables: { storeId } },
        { query: QUERY_SEE_STORE, variables: { id: storeId } },
      ],
    }
  );
  const [comment, setComment] = useState("");
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getComments();
    }
    return () => {
      isMounted = false;
    };
  }, [getComments]);
  const onSubmitHandle = (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        storeId,
        comment,
      },
    });
  };
  return (
    <Container>
      <Title>댓글</Title>
      <Count>총 {commentCount}개의 댓글이 게시되었습니다.</Count>
      <Inner>
        <form onSubmit={onSubmitHandle}>
          <label htmlFor="comment">
            <BiCommentCheck />
          </label>
          <input
            type="text"
            placeholder="댓글달기..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">게시</button>
        </form>
        {data?.seeComments?.map((comment) => {
          return (
            <Comment key={comment.id} comment={comment} storeId={storeId} />
          );
        })}
      </Inner>
    </Container>
  );
};

export default Comments;
