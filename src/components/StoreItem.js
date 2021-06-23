import { useMutation } from "@apollo/client";
import ReactImageGallery from "react-image-gallery";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { DELETE_STORE_MUTATION } from "../apollo/mutation/store";
import routes from "../routes";
import {
  RiBarChartBoxLine,
  RiDeleteBin2Line,
  RiEditBoxLine,
} from "react-icons/ri";
import Popup from "reactjs-popup";
import EditStore from "./ManageStore/EditStore";
const PhotoItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 25px 3px ${(props) => props.theme.login.shadowColor};
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  background-color: ${(props) => props.theme.login.btnBgColor};
`;

const SubHeader = styled.div`
  width: 100%;
  padding: 12px 17px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(1, 1fr);
  font-size: 16px;
`;

const Category = styled.div`
  width: 50px;
  text-align: center;
  background-color: #686de0;
  color: #fffcf5;
  padding: 8px;
  border-radius: 8px;
`;
const Holidays = styled.div`
  display: flex;
  grid-column: 2/5;
`;
const Rules = styled.div`
  display: flex;
  grid-column: 5/8;
`;

const Holiday = styled.div`
  background-color: #ff4500;
  color: #fffcf5;
  padding: 8px;
  border-radius: 8px;
  margin-right: 8px;
`;
const Rule = styled.div`
  background-color: ${(props) => props.theme.login.btnBgColor};
  color: #fffcf5;
  padding: 8px;
  border-radius: 8px;
  margin-right: 8px;
`;

const HeaderTitle = styled.h4`
  font-size: 1.8rem;
  color: ${(props) => props.theme.login.btnFontColor};
`;

const FieldItem = styled.h4`
  font-size: 1.4rem;
  color: ${(props) => props.theme.login.btnFontColor};
`;
const Body = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bgColor};
  padding: 20px 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  background-color: ${(props) => props.theme.login.btnBgColor};
`;
const ButtonBox = styled.div``;
const Button = styled.button`
  padding: 0 6px;
  svg {
    font-size: 32px;
    color: ${(props) => props.theme.login.btnFontColor};
  }
`;

const StyledPopup = styled(Popup)`
  @keyframes anvil {
    0% {
      transform: scale(1) translateY(0px);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }
    1% {
      transform: scale(0.96) translateY(10px);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }
    100% {
      transform: scale(1) translateY(0px);
      opacity: 1;
      box-shadow: 0 0 500px rgba(241, 241, 241, 0);
    }
  }
  &-content {
    animation: anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  }
`;

const StoreItem = ({ store, id }) => {
  const history = useHistory();
  const onCompleted = (data) => {
    if (data.deleteStore.ok) {
      history.push(routes.home);
    }
  };
  const [mutate, { loading }] = useMutation(DELETE_STORE_MUTATION, {
    onCompleted,
    update: (cache, result) => {
      const {
        data: {
          deleteStore: { ok },
        },
      } = result;
      if (ok) {
        cache.evict({ id: `Store:${id}` });
      }
    },
  });

  const deleteBtnHandler = () => {
    if (loading) {
      return;
    }
    mutate({ variables: { id } });
  };

  const images = store.photos.map((photo) => {
    const original = `${photo.photoURL}`;
    const thumbnail = `${photo.photoURL}`;
    return {
      original,
      thumbnail,
      originalHeight: 600,
      thumbnailHeight: 100,
    };
  });
  return store.isMine ? (
    <PhotoItemWrapper>
      <Header>
        <HeaderTitle>{store.store}</HeaderTitle>
        <ButtonBox>
          <Button onClick={() => history.push(`/me/store/${id}`)}>
            <RiBarChartBoxLine />
          </Button>
          <StyledPopup
            trigger={
              <Button>
                <RiEditBoxLine />
              </Button>
            }
            modal
            position="center"
          >
            {(close) => (
              <EditStore
                id={id}
                store={store.store}
                storeNumber={store.storeNumber}
                category={store.category}
                holiday={store.holidays}
                rule={store.rules}
                files={store.photos}
              />
            )}
          </StyledPopup>
          <Button onClick={deleteBtnHandler}>
            <RiDeleteBin2Line />
          </Button>
        </ButtonBox>
      </Header>
      <SubHeader>
        <Category>{store.category.name}</Category>
        <Holidays>
          {store.holidays.map((holiday) => {
            return <Holiday key={holiday.id}>{holiday.name}</Holiday>;
          })}
        </Holidays>
        <Rules>
          {store.rules.map((rule) => {
            return <Rule key={rule.id}>{rule.name}</Rule>;
          })}
        </Rules>
      </SubHeader>
      <Body>
        <ReactImageGallery items={images} />
      </Body>

      <Footer>
        <FieldItem>{store.user.username}</FieldItem>
        <FieldItem>{store.storeNumber}</FieldItem>
      </Footer>
    </PhotoItemWrapper>
  ) : (
    <PhotoItemWrapper>
      <Header>
        <HeaderTitle>{store.store}</HeaderTitle>
      </Header>
      <Body>
        <ReactImageGallery items={images} />
      </Body>
      <Footer>
        <FieldItem>{store.user.username}</FieldItem>
        <FieldItem>{store.storeNumber}</FieldItem>
      </Footer>
    </PhotoItemWrapper>
  );
};

export default StoreItem;
