import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LIKE_STORE_MUTATION } from "../apollo/mutation/store";
import { QUERY_SEE_STORES } from "../apollo/queries/store";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
const SStoreCard = styled.div`
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 3px ${(props) => props.theme.login.shadowColor};
`;

const Header = styled.div`
  background-color: ${(props) => props.theme.login.btnBgColor};
  padding: 5px;
  div:first-child {
    padding: 3px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border: 2px solid ${(props) => props.theme.login.btnFontColor};
  padding: 2px;
  border-radius: 50%;
  margin-right: 8px;
`;

const Title = styled.div`
  padding: 8px 0;
  font-size: 24px;
  border-top: 1px solid lightgray;
`;

const MoveBtn = styled.div`
  svg {
    font-size: 30px;
  }
`;
const Content = styled.div`
  width: 100%;
  height: 500px;
  background-image: url(${(props) => props.url});
  background-size: 100% 100%;
  background-position: center center;
`;

const Footer = styled.div`
  background-color: ${(props) => props.theme.login.btnBgColor};
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LikeBtn = styled.button`
  cursor: pointer;
  svg {
    font-size: 20px;
  }
`;

const StoreCard = ({ store, page }) => {
  const [likeStoreMutation, { loading }] = useMutation(LIKE_STORE_MUTATION, {
    variables: {
      id: store.id,
    },
    refetchQueries: [{ query: QUERY_SEE_STORES, variables: { page } }],
  });

  const likeBtnHandle = () => {
    if (loading) {
      return;
    }
    likeStoreMutation();
  };
  return (
    <SStoreCard>
      <Header>
        <div>
          <div>
            <Avatar
              src={
                store.user.avatarURL
                  ? store.user.avatarURL
                  : "/images/avatar.png"
              }
            />
            <span>{store.user.username}</span>
          </div>
          <MoveBtn>
            <Link to={`/store/${store.id}`}>
              <BiDetail />
            </Link>
          </MoveBtn>
        </div>
        <Title>{store.store}</Title>
      </Header>
      <Content url={store.photos[0].photoURL}></Content>
      <Footer>
        <span>좋아요 {store.likeCount}개</span>
        <div>
          <LikeBtn onClick={likeBtnHandle}>
            {store.isLiked ? (
              <BsHeartFill style={{ color: "#FF4500" }} />
            ) : (
              <BsHeart />
            )}
          </LikeBtn>
        </div>
      </Footer>
    </SStoreCard>
  );
};

export default StoreCard;
