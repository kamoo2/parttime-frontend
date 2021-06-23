import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";
import styled from "styled-components";
import {
  CREATE_DAILY_SAIL_MUTATION,
  DELETE_DAILY_SAIL_MUTATION,
} from "../../apollo/mutation/store";
import {
  QUERY_SEE_STORE,
  SEE_DAILY_SALES_QUERY,
} from "../../apollo/queries/store";
import FormError from "../../components/auth/FormError";
import Wrapper from "../../components/createStore/Wrapper";
import { Loader } from "../../components/Loader";
import SailChart from "../../components/ManageStore/SailChart";
import Employees from "../../components/ManageStore/Employees";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const StoreInfo = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid lightgray;
  padding: 50px 0;
  margin-bottom: 20px;
`;

const AvatarBox = styled.div`
  flex-basis: 300px;
  text-align: center;
`;
const StoreName = styled.h1`
  font-size: 24px;
  margin-top: 30px;
`;
const StorePhoto = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.url});
`;
const DetailInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const SailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Year = styled.h1`
  font-size: 36px;
  margin-bottom: 40px;
`;

const SailInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Sail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  padding: 20px;
  svg {
    font-size: 30px;
    margin-left: 10px;
    cursor: pointer;
    transition-duration: 300ms;
    &:hover {
      color: #ff4500;
    }
  }
`;

const SailName = styled.div`
  font-size: 36px;
  padding: 20px;
`;

const Button = styled.button`
  text-align: center;
  padding: 15px 0;
  margin-top: 20px;
  border-radius: 8px;
  color: ${(props) => props.theme.login.btnFontColor};
  background-color: ${(props) =>
    props.disabled
      ? props.theme.login.disableBtnBgColor
      : props.theme.login.btnBgColor};
`;

const FormBox = styled.div`
  width: 40%;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  font-size: 30px;
  border-bottom: 1px solid black;
`;
const ManageStore = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });
  const storeId = parseInt(id);
  const now = new Date();
  const [createSailMutation, { loading: createSailLoading }] = useMutation(
    CREATE_DAILY_SAIL_MUTATION,
    {
      refetchQueries: [
        { query: QUERY_SEE_STORE, variables: { id: storeId } },
        {
          query: SEE_DAILY_SALES_QUERY,
          variables: {
            storeId,
            year: now.getFullYear(),
            month: now.getMonth() + 1,
          },
        },
      ],
    }
  );

  const [getStore, { data, loading }] = useLazyQuery(QUERY_SEE_STORE, {
    variables: { id: storeId },
  });
  const [getStoreSales, { data: sailData, loading: saleLoading }] =
    useLazyQuery(SEE_DAILY_SALES_QUERY, {
      variables: {
        storeId,
        year: now.getFullYear(),
        month: now.getMonth() + 1,
      },
    });
  const todaySail = sailData?.seeDailySails.sails.filter((sail) => {
    if (
      sail.year === now.getFullYear() &&
      sail.month === now.getMonth() + 1 &&
      sail.day === now.getDate()
    ) {
      return sail.id;
    }
    return null;
  });
  const [deleteSailMutation, { loading: deleteSailLoading }] = useMutation(
    DELETE_DAILY_SAIL_MUTATION,
    {
      refetchQueries: [
        { query: QUERY_SEE_STORE, variables: { id: storeId } },
        {
          query: SEE_DAILY_SALES_QUERY,
          variables: {
            storeId,
            year: now.getFullYear(),
            month: now.getMonth() + 1,
          },
        },
      ],
    }
  );
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getStore();
      getStoreSales();
    }
    return () => {
      isMounted = false;
    };
  }, [getStore, getStoreSales]);
  if (loading || saleLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  const chartData = sailData?.seeDailySails?.sails.map((sail) => ({
    name: sail.day,
    일매출: sail.sail,
  }));

  const onSubmitHandler = (data) => {
    if (createSailLoading) {
      return;
    }
    createSailMutation({
      variables: {
        storeId,
        sail: parseInt(data.sail),
      },
    });
    reset("sail");
  };

  const deleteSailEvent = () => {
    if (deleteSailLoading) {
      return;
    }
    deleteSailMutation({
      variables: {
        sailId: todaySail[0].id,
      },
    });
  };
  return (
    <Wrapper>
      <StoreInfo>
        <AvatarBox>
          <Link to={`/store/${id}`}>
            <StorePhoto url={data?.seeStore?.store?.photos[0].photoURL} />
          </Link>
          <StoreName>{data?.seeStore?.store?.store}</StoreName>
          <StoreName>
            {data?.seeStore?.store?.user?.username}님의 가게입니다.
          </StoreName>
        </AvatarBox>
        <DetailInfo>
          <SailBox>
            <Year>
              {now.getFullYear()}년 {now.getMonth() + 1}월
            </Year>
            <SailInfo>
              <div>
                <SailName>연매출</SailName>
                <SailName>월매출</SailName>
                <SailName>일매출</SailName>
              </div>
              <div>
                <Sail>
                  {data?.seeStore?.store?.total_year_sail.toLocaleString()}원
                </Sail>
                <Sail>
                  {data?.seeStore?.store?.total_month_sail.toLocaleString()}원
                </Sail>
                <Sail>
                  {data?.seeStore?.store?.today_sail.toLocaleString()}원
                  {data?.seeStore?.store?.today_sail ? (
                    <button
                      onClick={deleteSailEvent}
                      style={{ fontSize: "16px" }}
                    >
                      <IoTrashBinOutline />
                    </button>
                  ) : null}
                </Sail>
              </div>
            </SailInfo>
          </SailBox>
          <FormBox>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
              <Input
                {...register("sail", {
                  required: "매출을 입력해주세요.",
                  pattern: {
                    value: /^[0-9]/g,
                    message: "숫자만 입력해주세요.",
                  },
                })}
                type="text"
                placeholder="오늘의 매출"
              />
              <FormError message={errors?.sail?.message} />
              <Button type="submit" disabled={!isValid}>
                매출등록
              </Button>
            </Form>
          </FormBox>
        </DetailInfo>
      </StoreInfo>
      <SailChart chartData={chartData} />
      <Employees storeId={storeId} />
    </Wrapper>
  );
};

export default ManageStore;
