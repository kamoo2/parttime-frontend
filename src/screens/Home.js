import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TitleBox from "../components/TitleBox";
import PageTitle from "../components/PageTitle";
import { QUERY_SEE_STORES } from "../apollo/queries/store";
import { useLazyQuery } from "@apollo/client";
import StoreCard from "../components/StoreCard";
import Wrapper from "../components/createStore/Wrapper";
import { Loader } from "../components/Loader";
const MainContainer = styled.div`
  width: 100%;
`;

const StoreSection = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 370px;
  grid-gap: 25px;
`;
const PaginationContainer = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
`;
const Pagination = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(3, 1fr);
  position: absolute;
  right: 30px;
  top: 0;
  svg:nth-child(1) {
    justify-self: right;
    grid-column: 1/2;
  }
  svg:nth-child(2) {
    justify-self: left;
    grid-column: 3/4;
  }
`;

const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 2/3;
  font-size: 18px;
`;

const Home = () => {
  const [page, setPage] = useState(1);
  const [getAllStores, { data, loading }] = useLazyQuery(QUERY_SEE_STORES, {
    variables: {
      page,
    },
  });
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getAllStores();
    }
    return () => {
      isMounted = false;
    };
  }, [getAllStores]);
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  return (
    <MainContainer>
      <PageTitle title="Home" />
      <Wrapper>
        <TitleBox
          title="Part Time Management"
          subtitle="직원의 급여,정보,근무일정까지 모두 PTMM에서 해결합니다."
          titleSize="40px"
          subSize="20px"
        />
        <PaginationContainer>
          <Pagination>
            {page === 1 ? null : (
              <RiArrowLeftSLine
                size={30}
                onClick={() => setPage(page - 1)}
                style={{ cursor: "pointer", gridColumn: 1 / 2 }}
              />
            )}
            <Span>{page}Page</Span>
            {page === data?.seeAllStores[0]?.total_page ? null : (
              <RiArrowRightSLine
                size={30}
                onClick={() => setPage(page + 1)}
                style={{ cursor: "pointer", gridColumn: 3 / 4 }}
              />
            )}
          </Pagination>
        </PaginationContainer>
        <StoreSection>
          {data &&
            data.seeAllStores.map((item) => (
              <StoreCard key={item.id} store={item} page={page} />
            ))}
        </StoreSection>
      </Wrapper>
    </MainContainer>
  );
};

export default Home;
