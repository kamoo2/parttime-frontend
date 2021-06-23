import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { MY_STORES_QUERY } from "../../apollo/queries/store";
import Wrapper from "../createStore/Wrapper";
import { Loader } from "../Loader";
import StoreCard from "../StoreCard";

const SPhotos = styled.div`
  width: 100%;
  max-width: 1200px;
  position: relative;
`;
const StoreSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 370px;
  grid-gap: 25px;
`;

const Pagination = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 20px;
  position: absolute;
  top: -35px;
  left: -30px;
`;

const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 2/3;
  font-size: 18px;
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
    <SPhotos>
      {data?.myStores.length === 0 ? null : (
        <Pagination>
          {page === 1 ? null : (
            <RiArrowLeftSLine
              size={30}
              onClick={() => setPage(page - 1)}
              style={{ cursor: "pointer", gridColumn: 1 / 2 }}
            />
          )}
          <Span>{page}Page</Span>
          {page === data?.myStores?.[0]?.total_page ? null : (
            <RiArrowRightSLine
              size={30}
              onClick={() => setPage(page + 1)}
              style={{ cursor: "pointer", gridColumn: 3 / 4 }}
            />
          )}
        </Pagination>
      )}
      <StoreSection>
        {data?.myStores?.map((item) => (
          <StoreCard key={item.id} store={item} />
        ))}
      </StoreSection>
    </SPhotos>
  );
};

export default Photos;
