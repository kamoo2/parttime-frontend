import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SEE_PROFILE_QUERY } from "../apollo/queries/user";
import Avatar from "../components/Avatar";
import Wrapper from "../components/createStore/Wrapper";
import Photos from "../components/profile/Photos";
import routes from "../routes";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "../components/Loader";

const ProfileSection = styled.section`
  width: 50%;
  border-radius: 5px;
  padding: 25px 25px;
  margin: 100px 0;
  background-color: white;
  box-shadow: 0px 7px 14px 3px rgba(148, 140, 148, 1);
`;

const InfoBox = styled.div``;

const Title = styled.h1`
  margin-bottom: 5px;
  font-size: 12px;
  color: gray;
`;

const Field = styled.h1`
  font-size: ${(props) => props.size};
`;

const AvatarBox = styled.div`
  flex-basis: 30%;
`;
const Info = styled.div`
  flex-basis: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const TopBox = styled.div``;
const BottomBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const ButtonBox = styled.button`
  background-color: ${(props) => props.theme.login.btnBgColor};
  color: ${(props) => props.theme.login.btnFontColor};
  padding: 8px 12px;
  border-radius: 4px;
`;

const TotalCount = styled.div``;

const SubInfo = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
const Profile = () => {
  const { username } = useParams();
  const [getProfile, { data, loading }] = useLazyQuery(SEE_PROFILE_QUERY, {
    variables: { username },
  });
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getProfile();
    }
    return () => {
      isMounted = false;
    };
  }, [getProfile]);
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <ProfileSection>
        <InfoBox>
          <InfoContainer>
            <AvatarBox>
              <Avatar
                url={data?.seeProfile?.avatarURL}
                exist={Boolean(data?.seeProfile?.avatarURL)}
              />
            </AvatarBox>
            <Info>
              <TopBox>
                <Title>Username</Title>
                <Field size="25px">{data?.seeProfile?.username}</Field>
              </TopBox>
              <BottomBox>
                <div>
                  <Title>Name</Title>
                  <Field size="18px">{data?.seeProfile?.name}</Field>
                </div>
                <div>
                  <Title>Email</Title>
                  <Field size="18px">{data?.seeProfile?.email}</Field>
                </div>
              </BottomBox>
            </Info>
          </InfoContainer>
          <SubInfo>
            <Link
              to={{
                pathname: routes.editProfile,
                state: { id: data?.seeProfile?.id },
              }}
            >
              <ButtonBox>프로필 수정</ButtonBox>
            </Link>
            <TotalCount>
              소유한 Store 개수 : {data?.seeProfile?.total_stores}
            </TotalCount>
          </SubInfo>
        </InfoBox>
      </ProfileSection>
      <Photos username={data?.seeProfile?.username} />
    </Wrapper>
  );
};

export default Profile;
