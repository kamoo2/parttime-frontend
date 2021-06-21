import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const PhotoItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border: 1px solid black;
  margin-bottom: 60px;
  min-height: 60px;
`;

const Photo = styled.div`
  width: 100%;
  height: 700px;
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.url});
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background-color: white;
  color: black;
`;

const HeaderTitle = styled.h4`
  font-size: 1.4rem;
  color: black;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PhotoArea = styled.div`
  width: 100%;
`;

const PhotoContentContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Thumbnail = styled.div`
  width: 150px;
  height: 150px;
  background-position: center center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  cursor: pointer;
  ${(props) =>
    props.selected &&
    css`
      backdrop-filter: blur(10px);
      opacity: 0.3;
    `}
`;

const StoreItem = ({ store }) => {
  const [photo, setPhoto] = useState(store.photos[0].photoURL);
  const onPhotoClick = (url) => {
    if (url === photo) {
      setPhoto(store.photos[0].photoURL);
    } else {
      setPhoto(url);
    }
  };
  return (
    <>
      <PhotoItemWrapper>
        <Header>
          <HeaderTitle>
            <Link to={`/store/${store.id}`}>{store.store}</Link>
          </HeaderTitle>
        </Header>
        <Body>
          <PhotoArea>
            <Photo url={photo} />
          </PhotoArea>
          {store.photos && store.photos.length > 1 && (
            <>
              <p style={{ marginTop: 4, marginBottom: 8 }}>사진</p>
              <PhotoContentContainer>
                {store.photos.map((p) => (
                  <Thumbnail
                    key={`Thumbnail:${p?.id}`}
                    url={p?.photoURL}
                    selected={p?.photoURL === photo}
                    onClick={() => onPhotoClick(p?.photoURL)}
                  />
                ))}
              </PhotoContentContainer>
            </>
          )}
        </Body>
      </PhotoItemWrapper>
    </>
  );
};

export default StoreItem;
