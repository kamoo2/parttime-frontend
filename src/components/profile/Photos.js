import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import Wrapper from "../createStore/Wrapper";
import { Loader } from "../Loader";
import StoreCard from "../StoreCard";

export const MY_STORES_QUERY = gql`
  query myStores($page: Int) {
    myStores(page: $page) {
      id
      store
      photos {
        id
        photoURL
      }
      user {
        id
        username
      }
      total_page(take: 3, home: false)
    }
  }
`;

const StoreSection = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 370px;
`;

const Pagination = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(3, 1fr);
`;

const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 2/3;
`;

const Photos = ({ username }) => {
  const [page, setPage] = useState(1);
  const [getStore, { data, loading }] = useLazyQuery(MY_STORES_QUERY, {
    variables: {
      page,
    },
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getStore();
    }
    return () => {
      isMounted = false;
    };
  }, [getStore]);
  if (loading) {
    <Wrapper>
      <Loader />
    </Wrapper>;
  }
  return (
    <>
      <StoreSection>
        {data?.myStores?.map((item) => (
          <StoreCard key={item.id} store={item} />
        ))}
      </StoreSection>

      {data?.myStores.length === 0 ? null : (
        <Pagination>
          {page === 1 ? null : (
            <RiArrowLeftSLine
              size={30}
              onClick={() => setPage(page - 1)}
              style={{ cursor: "pointer", gridColumn: 1 / 2 }}
            />
          )}
          <Span>{page}</Span>
          {page === data?.myStores?.[0]?.total_page ? null : (
            <RiArrowRightSLine
              size={30}
              onClick={() => setPage(page + 1)}
              style={{ cursor: "pointer", gridColumn: 3 / 4 }}
            />
          )}
        </Pagination>
      )}
    </>
  );
};

export default Photos;
