import styled from "styled-components";
import { Link } from "react-router-dom";
const SStoreCard = styled.div`
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding-bottom: 30px;
  transition: all 0.5s ease;
  border-radius: 6px;
  cursor: pointer;
  :hover {
    transform: translateY(-10px);
  }
  :hover > :first-child {
    transform: scale(1.1);
  }
  :hover > :last-child {
    transform: translateY(-10px);
  }
`;

const StoreContent = styled.div`
  width: 100%;
  height: 250px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  border-radius: 6px;
  z-index: -1;
  transition: all 0.5s ease;
`;

const StoreHeader = styled.div`
  width: 80%;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  border-radius: 6px;
  margin-top: -40px;
  transition: all 0.5s ease;
  box-shadow: 0px 7px 14px 3px rgba(148, 140, 148, 1);
`;

const StoreName = styled.span``;

const Username = styled.span``;

const StoreCard = ({ store }) => {
  return (
    <Link to={`/store/${store.id}`}>
      <SStoreCard>
        <StoreContent url={store.photos[0].photoURL} />
        <StoreHeader>
          <StoreName>{store.store}</StoreName>
          <Username>{store.user.username}</Username>
        </StoreHeader>
      </SStoreCard>
    </Link>
  );
};

export default StoreCard;
