import { useLazyQuery, useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import routes from "../../routes";
import { QUERY_SEE_STORE } from "../../apollo/queries/store";
import { MUTATION_DELETE_STORE } from "../../apollo/mutation/store";
import PageTitle from "../../components/PageTitle";
import { Loader, PageLoader } from "../../components/Loader";
import StoreItem from "../../components/StoreItem";
import Wrapper from "../../components/createStore/Wrapper";
import { useEffect } from "react";

const DetailStore = () => {
  const { id } = useParams();
  const storeId = parseInt(id);
  const history = useHistory();
  const [getStore, { data, seeStoreLoading }] = useLazyQuery(QUERY_SEE_STORE, {
    variables: { id: storeId },
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

  const onCompleted = (data) => {
    if (data.deleteStore.ok) {
      history.push(routes.home);
    }
  };
  const [mutate, { loading: deleteStoreLoading }] = useMutation(
    MUTATION_DELETE_STORE,
    {
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
    }
  );
  if (seeStoreLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  const deleteBtnHandler = () => {
    if (deleteStoreLoading) {
      return;
    }
    mutate({ variables: { id: parseInt(id) } });
  };
  return (
    <Wrapper>
      <PageTitle title="STORE" />
      {seeStoreLoading && <PageLoader />}
      {!seeStoreLoading && data && data.seeStore?.store?.isMine && (
        <>
          <StoreItem store={data.seeStore.store} />
          <button onClick={() => deleteBtnHandler()}>삭제</button>
          <button>가게 수정</button>
          <button onClick={() => history.push(`/me/store/${id}`)}>
            가게 관리
          </button>
        </>
      )}
      {!seeStoreLoading && data && !data.seeStore?.store?.isMine && (
        <StoreItem store={data.seeStore.store} />
      )}
    </Wrapper>
  );
};

export default DetailStore;
