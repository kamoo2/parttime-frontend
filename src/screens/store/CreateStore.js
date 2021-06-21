import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { MUTATION_CREATE_STORE } from "../../apollo/mutation/store";
import { QUERY_SEE_STORES } from "../../apollo/queries/store";
import Button from "../../components/auth/Button";
import FormError from "../../components/auth/FormError";
import Input from "../../components/auth/Input";
import Wrapper from "../../components/createStore/Wrapper";
import TitleBox from "../../components/TitleBox";
import { PhoneRegex } from "../../regaxs";
import routes from "../../routes";
import "react-confirm-alert/src/react-confirm-alert.css";
import useUser from "../../hooks/useUser";
import { MY_STORES_QUERY } from "../../components/profile/Photos";
import { SEE_PROFILE_QUERY } from "../../apollo/queries/user";

const CreateStore = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    setFocus,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const history = useHistory();
  const { data: userData } = useUser();
  const [load, setLoad] = useState(false);
  const onCompleted = ({ createStore: { ok, error } }) => {
    setLoad(false);
    if (ok) {
      history.push(routes.home);
    } else {
      setFocus("storeNumber");
      setError("result", { message: error });
    }
  };

  const [createStoreMutation, { loading }] = useMutation(
    MUTATION_CREATE_STORE,
    {
      onCompleted,
      refetchQueries: [
        { query: QUERY_SEE_STORES, variables: { page: 1 } },
        { query: MY_STORES_QUERY, variables: { page: 1 } },
        {
          query: SEE_PROFILE_QUERY,
          variables: { username: userData?.me?.username },
        },
      ],
    }
  );

  const onValid = (data) => {
    if (loading) {
      return;
    }
    setLoad(true);
    createStoreMutation({
      variables: {
        ...data,
      },
    });
  };

  const storeNumber = register("storeNumber", {
    required: "가게의 전화번호를 입력해주세요.",
    pattern: {
      value: PhoneRegex,
      message: "xxx-xxxx-xxxx양식에 맞게 입력해주세요.",
    },
  });
  return (
    <Wrapper>
      <TitleBox
        title="CREATE STORE"
        subtitle="STORE을 생성해주세요."
        titleSize="40px"
        subSize="20px"
      />
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("store", { required: "가게명을 입력해주세요." })}
          type="text"
          placeholder="storename"
        />
        <FormError message={errors?.store?.message} />
        <Input
          {...storeNumber}
          type="text"
          onChange={(e) => {
            clearErrors("result");
            storeNumber.onChange(e);
          }}
          placeholder="storeNumber"
        />
        <FormError message={errors?.storeNumber?.message} />
        <Input
          {...register("category", {
            required: "가게의 카테고리를 입력해주세요.",
          })}
          type="text"
          placeholder="category"
        />
        <FormError message={errors?.category?.message} />
        <Input
          {...register("holiday", { required: "가게의 휴일을 입력해주세요." })}
          type="text"
          placeholder="holiday"
        />
        <FormError message={errors?.holiday?.message} />
        <Input {...register("rule")} type="text" placeholder="rule" />
        <Input
          {...register("files", { required: "가게의 사진을 등록해주세요." })}
          type="file"
          multiple
        />
        <FormError message={errors?.files?.message} />
        <Button type="submit" value="생성용" load={load} />
        <FormError message={errors?.result?.message} />
      </form>
    </Wrapper>
  );
};

export default CreateStore;
