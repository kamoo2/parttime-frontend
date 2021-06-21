import { useMutation, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { CREATE_EMPLOYEE_MUTATION } from "../../apollo/mutation/employee";
import { SEE_EMPLOYEES_QUERY } from "../../apollo/queries/employee";
import { darkModeVar } from "../../apollo/vars";
import EmployeeCard from "./EmployeeCard";

const CreateEmployee = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding-bottom: 50px;
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-gap: 10px;
`;
const FormBox = styled.div`
  width: 100%;
`;
const ValueBox = styled.div`
  width: 100%;
`;

const InputCard = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 10px;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  form {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    div:nth-child(1) {
      margin: 0 auto;
    }
    div:nth-child(2) {
      grid-column: 2/4;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-gap: 10px;
    }
    input {
      width: 100%;
      padding: 10px 2px;
    }
    input:focus {
      border: 1px solid ${(props) => props.theme.borderColor};
      border-radius: 3px;
    }
    select {
      width: 100%;
    }
    button {
      background-color: ${(props) => props.theme.login.btnBgColor};
      color: ${(props) => props.theme.login.btnFontColor};
      border-radius: 5px;
      text-align: center;
    }
  }
`;
const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid lightgray;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 30px;
  margin: 30px 0;
`;

const EmployeeForm = ({ storeId }) => {
  const isDarkMode = useReactiveVar(darkModeVar);
  const { register, handleSubmit, watch, setValue } = useForm({
    mode: "onChange",
  });
  const [previewImage, setPreviewImage] = useState();
  const [CreateEmployeeMutation, { loading: createEmployeeLoading }] =
    useMutation(CREATE_EMPLOYEE_MUTATION, {
      refetchQueries: [
        {
          query: SEE_EMPLOYEES_QUERY,
          variables: {
            storeId,
          },
        },
      ],
    });
  const onSubmitValid = (data) => {
    if (createEmployeeLoading) {
      return;
    }
    const { name, age, sex, wage, phoneNumber, file } = data;
    CreateEmployeeMutation({
      variables: {
        name,
        age: parseInt(age),
        wage: parseInt(wage),
        sex,
        phoneNumber,
        ...(file.length === 1 && { file: file[0] }),
        storeId,
      },
    });
  };

  const readImage = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  return (
    <CreateEmployee>
      <Title>알바생성</Title>
      <Container>
        <FormBox>
          <InputCard>
            <form onSubmit={handleSubmit(onSubmitValid)}>
              <div>
                <label htmlFor="avatar">
                  <Avatar
                    src={
                      isDarkMode
                        ? "/images/dark_avatar.png"
                        : "/images/avatar.png"
                    }
                  />
                </label>
                <input
                  style={{ display: "none" }}
                  {...register("file")}
                  type="file"
                  id="avatar"
                  onChange={(e) => {
                    readImage(e.target);
                    setValue("file", e.target.files);
                  }}
                />
              </div>
              <div>
                <input
                  {...register("name", { required: "이름을 입력해주세요." })}
                  type="text"
                  placeholder="이름"
                />
                <select {...register("sex")}>
                  <option value="남자">남자</option>
                  <option value="여자">여자</option>
                </select>
                <input
                  {...register("age", { required: "나이를 입력해주세요." })}
                  type="text"
                  placeholder="나이"
                />
                <input
                  {...register("wage", { required: "시급을 입력해주세요." })}
                  type="text"
                  placeholder="시급"
                />
                <input
                  {...register("phoneNumber", {
                    required: "전화번호를 입력해주세요.",
                  })}
                  type="text"
                  placeholder="전화번호"
                />

                <button type="submit">등록</button>
              </div>
            </form>
          </InputCard>
        </FormBox>
        <ValueBox>
          <EmployeeCard
            avatarURL={previewImage}
            name={watch().name}
            age={watch().age}
            wage={watch().wage}
            sex={watch().sex}
            phoneNumber={watch().phoneNumber}
          />
        </ValueBox>
      </Container>
    </CreateEmployee>
  );
};

export default EmployeeForm;
