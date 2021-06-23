import { useMutation, useReactiveVar } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { CREATE_EMPLOYEE_MUTATION } from "../../apollo/mutation/employee";
import { SEE_EMPLOYEES_QUERY } from "../../apollo/queries/employee";
import { darkModeVar } from "../../apollo/vars";
import { PhoneRegex } from "../../regaxs";
import FormError from "../auth/FormError";
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
  grid-gap: 25px;
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
  box-shadow: 0px 0px 25px 3px ${(props) => props.theme.login.shadowColor};
  border-radius: 10px;
  display: flex;
  align-items: center;
  form {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    div:nth-:nth-of-type(1) {
      margin: 0 auto;
    }
    div:nth-child(2) {
      grid-column: 2/4;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-gap: 10px;
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
  cursor: pointer;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 30px;
  margin: 30px 0;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  input {
    padding: 10px 2px;
  }
  input:focus {
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 3px;
  }
  select {
    width: 100%;
  }
`;
const EmployeeForm = ({ storeId }) => {
  const isDarkMode = useReactiveVar(darkModeVar);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
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
      onCompleted: (data) => {
        if (!data.createEmployee.ok) {
          setError("result", { message: data.createEmployee.error });
        }
      },
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

  const phoneNumberRef = register("phoneNumber", {
    required: "전화번호를 입력해주세요.",
    pattern: {
      value: PhoneRegex,
      message: "xxx-xxxx-xxxx 양식에 맞게 입력해주세요.",
    },
  });
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
                <InputBox>
                  <input
                    {...register("name", { required: "이름을 입력해주세요." })}
                    type="text"
                    placeholder="이름"
                  />
                  <FormError message={errors?.name?.message} />
                </InputBox>
                <select {...register("sex")}>
                  <option value="남자">남자</option>
                  <option value="여자">여자</option>
                </select>
                <InputBox>
                  <input
                    {...register("age", { required: "나이를 입력해주세요." })}
                    type="text"
                    placeholder="나이"
                  />
                  <FormError message={errors?.age?.message} />
                </InputBox>
                <InputBox>
                  <input
                    {...register("wage", { required: "시급을 입력해주세요." })}
                    type="text"
                    placeholder="시급"
                  />
                  <FormError message={errors?.wage?.message} />
                </InputBox>
                <InputBox>
                  <input
                    {...phoneNumberRef}
                    type="text"
                    placeholder="전화번호"
                    onChange={(e) => {
                      clearErrors("result");
                      phoneNumberRef.onChange(e);
                    }}
                  />
                  <FormError message={errors?.phoneNumber?.message} />
                </InputBox>
                <button type="submit">등록</button>
                <FormError message={errors?.result?.message} />
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
