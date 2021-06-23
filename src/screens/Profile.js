import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SEE_PROFILE_QUERY } from "../apollo/queries/user";
import Avatar from "../components/Avatar";
import Wrapper from "../components/createStore/Wrapper";
import Photos from "../components/profile/Photos";
import routes from "../routes";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

const ProfileSection = styled.section`
  width: 50%;
  border-radius: 5px;
  padding: 25px 25px;
  margin: 100px 0;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 0px 0px 25px 3px ${(props) => props.theme.login.shadowColor};
`;

const InfoBox = styled.div``;

const Title = styled.h1`
  margin-bottom: 5px;
  font-size: 12px;
  color: gray;
`;

const Field = styled.h1`
  font-size: ${(props) => props.size};
  color: ${(props) => props.theme.fontColor};
  font-weight: 900;
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

const TopBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
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
  color: ${(props) => props.theme.fontColor};
`;
const Profile = () => {
  const { id } = useParams();
  const [getProfile, { data }] = useLazyQuery(SEE_PROFILE_QUERY, {
    variables: { id: parseInt(id) },
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
  return (
    <Wrapper>
      <ProfileSection>
        <InfoBox>
          <InfoContainer>
            <AvatarBox>
              <Avatar
                url={data?.seeProfile?.user?.avatarURL}
                exist={Boolean(data?.seeProfile?.user?.avatarURL)}
              />
            </AvatarBox>
            <Info>
              <TopBox>
                <div>
                  <Title>Username</Title>
                  <Field size="20px">{data?.seeProfile?.user?.username}</Field>
                </div>
                <div>
                  <Title>Name</Title>
                  <Field size="20px">{data?.seeProfile?.user?.name}</Field>
                </div>
              </TopBox>
              <BottomBox>
                <div>
                  <Title>PhoneNumber</Title>
                  <Field size="18px">
                    {data?.seeProfile?.user?.phoneNumber
                      ? data?.seeProfile?.user?.phoneNumber
                      : "등록해주세요."}
                  </Field>
                </div>
                <div>
                  <Title>Email</Title>
                  <Field size="18px">{data?.seeProfile?.user?.email}</Field>
                </div>
              </BottomBox>
            </Info>
          </InfoContainer>
          <SubInfo>
            <Link
              to={{
                pathname: routes.editProfile,
                state: { id: data?.seeProfile?.user?.id },
              }}
            >
              <ButtonBox>프로필 수정</ButtonBox>
            </Link>
            <TotalCount>
              STORE {data?.seeProfile?.user?.total_stores}개
            </TotalCount>
          </SubInfo>
        </InfoBox>
      </ProfileSection>
      <Photos username={data?.seeProfile?.user?.username} />
    </Wrapper>
  );
};

export default Profile;
