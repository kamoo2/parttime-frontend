import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import { UPDATE_STORE_MUTATION } from "../../apollo/mutation/store";
import {
  MY_STORES_QUERY,
  QUERY_SEE_STORE,
  QUERY_SEE_STORES,
} from "../../apollo/queries/store";
import { PhoneRegex } from "../../regaxs";
import FormError from "../auth/FormError";
import { store as storeC } from "react-notifications-component";

const PhotoItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  background-color: ${(props) => props.theme.login.btnBgColor};
`;

const HeaderTitle = styled.h4`
  font-size: 1.8rem;
  color: ${(props) => props.theme.login.btnFontColor};
`;

const Body = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  padding: 20px 0;
  background-color: ${(props) => props.theme.bgColor};
`;

const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 8px;
  label {
    margin-bottom: 15px;
  }
  input {
    border-bottom: 1px solid black;
  }
`;

const Preview = styled.div`
  padding: 20px;
`;

const Footer = styled.div`
  padding: 12px 8px;
  background-color: ${(props) => props.theme.login.btnBgColor};
`;

const Button = styled.button`
  width: 100%;
  padding: 4px 0;
  text-align: center;
  color: ${(props) => props.theme.login.btnFontColor};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
`;

const LabelBtn = styled.label`
  padding: 12px 8px;
  background-color: ${(props) => props.theme.login.btnBgColor};
  color: ${(props) => props.theme.login.btnFontColor};
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 0px !important;
`;

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  div {
    padding: 12px;
  }
`;
const Img = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
`;

const EditStore = ({
  id,
  store,
  storeNumber,
  category,
  holiday,
  rule,
  files,
}) => {
  const newPhotoURL = files.map((f) => {
    return f.photoURL;
  });
  const [previewImages, setPreviewImages] = useState(newPhotoURL);

  const newHoliday = holiday.map((h) => {
    return h.name;
  });
  const newRule = rule.map((r) => {
    return r.name;
  });
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      store,
      storeNumber,
      category: category.name,
      holiday: newHoliday.join(","),
      rule: newRule.join(","),
    },
  });
  const [updateStoreMutation, { loading }] = useMutation(
    UPDATE_STORE_MUTATION,
    {
      refetchQueries: [
        { query: QUERY_SEE_STORES, variables: { page: 1 } },
        { query: QUERY_SEE_STORE, variables: { id } },
        { query: MY_STORES_QUERY, variables: { page: 1 } },
      ],
      onCompleted: (data) => {
        const { store } = getValues();
        if (data.updateStore.ok) {
          storeC.addNotification({
            title: "✅",
            message: `${store}의 정보가 변경되었습니다.`,
            type: "success",
            container: "top-center",
            dismiss: {
              duration: 3000,
              onScreen: true,
            },
          });
        }
      },
    }
  );

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    updateStoreMutation({
      variables: {
        id,
        ...(store !== data.store && { store: data.store }),
        ...(storeNumber !== data.storeNumber && {
          storeNumber: data.storeNumber,
        }),
        ...(category.name !== data.category && { category: data.category }),
        ...(newHoliday.join(",") !== data.holiday && { holiday: data.holiday }),
        ...(newRule.join(",") !== data.rule && { rule: data.rule }),
        ...(data.files && data.files.length > 0 && { files: data.files }),
      },
    });
  };

  const handleImagePreview = (e) => {
    const fileArr = e.target.files;
    let fileURLs = [];
    let file;
    let filesLength = fileArr.length > 6 ? 6 : fileArr.length;
    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setPreviewImages([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  const storeNumberRef = register("storeNumber", {
    required: "전화번호를 입력해주세요.",
    pattern: {
      value: PhoneRegex,
      message: "xxx-xxxx-xxxx 양식에 맞게 입력해주세요.",
    },
  });
  return (
    <PhotoItemWrapper>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Header>
          <HeaderTitle>Edit Store</HeaderTitle>
        </Header>
        <Body>
          <Wrapper>
            <Grid>
              <InputBox>
                <label htmlFor="name">가게명</label>
                <input
                  {...register("store", { required: "가게명을 입력해주세요." })}
                  id="name"
                  type="text"
                />
                <FormError message={errors?.store?.message} />
              </InputBox>
              <InputBox>
                <label htmlFor="number">전화번호</label>
                <input
                  {...storeNumberRef}
                  id="number"
                  type="text"
                  onChange={(e) => {
                    clearErrors("result");
                    storeNumberRef.onChange(e);
                  }}
                />
                <FormError message={errors?.storeNumber?.message} />
              </InputBox>
            </Grid>
            <Grid>
              <InputBox>
                <label htmlFor="category">분야</label>
                <input
                  {...register("category", {
                    required: "분야를 입력해주세요.",
                  })}
                  id="category"
                  type="text"
                />
                <FormError message={errors?.category?.message} />
              </InputBox>
              <InputBox>
                <label htmlFor="holiday">휴일</label>
                <input
                  {...register("holiday", { required: "휴일을 입력해주세요." })}
                  id="holiday"
                  type="text"
                />
                <FormError message={errors?.holiday?.message} />
              </InputBox>
            </Grid>
            <Grid>
              <InputBox>
                <label htmlFor="rule">규칙</label>
                <input
                  {...register("rule", { required: "규칙를 입력해주세요." })}
                  id="rule"
                  type="text"
                />
                <FormError message={errors?.rule?.message} />
              </InputBox>
              <InputBox>
                <LabelBtn htmlFor="files">새로운 사진 등록</LabelBtn>
                <input
                  style={{ display: "none" }}
                  {...register("files")}
                  id="files"
                  type="file"
                  multiple
                  onChange={(e) => {
                    handleImagePreview(e);
                    setValue("files", e.target.files);
                  }}
                />
                <FormError message={errors?.files?.message} />
              </InputBox>
            </Grid>
          </Wrapper>
          <Wrapper>
            <Preview>
              <Images>
                {previewImages.map((item, index) => {
                  return (
                    <div key={index}>
                      <Img alt={`${index}-photo`} src={item} />
                    </div>
                  );
                })}
              </Images>
            </Preview>
          </Wrapper>
        </Body>

        <Footer>
          <Button type="submit">Update</Button>
        </Footer>
      </form>
    </PhotoItemWrapper>
  );
};
export default EditStore;
