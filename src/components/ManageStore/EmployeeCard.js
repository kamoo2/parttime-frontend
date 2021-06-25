import { useMutation, useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { HiPencilAlt, HiOutlineX } from "react-icons/hi";
import { BiCalendarCheck } from "react-icons/bi";
import Popup from "reactjs-popup";
import { darkModeVar } from "../../apollo/vars";
import FieldBox from "../employee/FieldBox";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  DELETE_EMPLOYEE_MUTATION,
  UPDATE_EMPLOYEE_MUTATION,
} from "../../apollo/mutation/employee";
import { SEE_EMPLOYEES_QUERY } from "../../apollo/queries/employee";
import { store } from "react-notifications-component";
import { confirmAlert } from "react-confirm-alert";
import WorkdayCheck from "./WorkdayCheck";

import { onlyNumberRegex, PhoneRegex } from "../../regaxs";
const SEmployeeCard = styled.div`
  width: 100%;
  padding: 70px 10px;
  box-shadow: 0px 0px 25px 3px ${(props) => props.theme.login.shadowColor};
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  position: relative;
`;
const ImageBox = styled.div``;

const FieldContainer = styled.div`
  grid-column: 2/4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid lightgray;
`;

const Icons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  button {
    margin-right: 20px;
  }
  svg {
    font-size: 20px;
    cursor: pointer;
  }
`;

const FormBox = styled.div`
  width: 100%;
  position: relative;
  background-color: ${(props) => props.theme.bgColor};
`;

const InputCard = styled.div`
  width: 100%;
  padding: 30px 10px;
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
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.login.btnBgColor};
  color: ${(props) => props.theme.login.btnFontColor};
  border-radius: 5px;
  text-align: center;
`;

const StyledPopup = styled(Popup)`
  @keyframes anvil {
    0% {
      transform: scale(1) translateY(0px);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }
    1% {
      transform: scale(0.96) translateY(10px);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }
    100% {
      transform: scale(1) translateY(0px);
      opacity: 1;
      box-shadow: 0 0 500px rgba(241, 241, 241, 0);
    }
  }
  &-content {
    animation: anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  }
`;

const CloseButton = styled(Button)`
  padding: 5px;
  position: absolute;
  top: 0;
  right: 0;
`;

const EmployeeCard = ({
  id,
  storeId,
  name,
  sex,
  age,
  wage,
  phoneNumber,
  avatarURL,
  salary,
  list = "false",
}) => {
  const isDarkMode = useReactiveVar(darkModeVar);
  const [preview, setPreview] = useState(
    avatarURL
      ? avatarURL
      : isDarkMode
      ? "/images/dark_avatar.png"
      : "/images/avatar.png"
  );
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      sex,
      age,
      wage,
      phoneNumber,
    },
    mode: "onSubmit",
  });
  const [updateEmployeeMutation, { loading }] = useMutation(
    UPDATE_EMPLOYEE_MUTATION,
    {
      refetchQueries: [
        {
          query: SEE_EMPLOYEES_QUERY,
          variables: {
            storeId,
          },
        },
      ],
      onCompleted: (data) => {
        const { name } = getValues();
        if (data.updateEmployee.ok) {
          store.addNotification({
            title: "✅",
            message: `${name} 님의 정보가 수정되었습니다.`,
            type: "default",
            container: "top-center",
            dismiss: {
              duration: 3000,
              onScreen: true,
            },
          });
        } else {
          store.addNotification({
            title: "🚫",
            message: data.updateEmployee.error,
            type: "danger",
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

  const [deleteEmployeeMutation] = useMutation(DELETE_EMPLOYEE_MUTATION, {
    variables: {
      storeId,
      id,
    },
    refetchQueries: [
      {
        query: SEE_EMPLOYEES_QUERY,
        variables: {
          storeId,
        },
      },
    ],
    onCompleted: (data) => {
      if (data?.deleteEmployee?.ok) {
        store.addNotification({
          title: "✅",
          message: `${name}님이 삭제되었습니다.`,
          type: "success",
          container: "top-center",
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      }
    },
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    updateEmployeeMutation({
      variables: {
        id,
        ...(name !== data.name && { name: data.name }),
        ...(age !== parseInt(data.age) && { age: parseInt(data.age) }),
        ...(wage !== parseInt(data.wage) && { wage: parseInt(data.wage) }),
        ...(sex !== data.sex && { sex: data.sex }),
        ...(phoneNumber !== data.phoneNumber && {
          phoneNumber: data.phoneNumber,
        }),
        ...(data.file.length === 1 && { file: data.file[0] }),
      },
    });
  };

  const onSubmitInvalid = () => {
    if (errors?.age) {
      store.addNotification({
        title: "🚫",
        message: `나이는 ${errors?.age?.message}`,
        type: "danger",
        container: "top-center",
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } else if (errors?.wage) {
      store.addNotification({
        title: "🚫",
        message: `시급은 ${errors?.wage?.message}`,
        type: "danger",
        container: "top-center",
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  };

  const readImage = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  const deleteAlert = () => {
    confirmAlert({
      title: "Delete",
      message: `${name}님을 삭제하시겠습니까 ?`,
      buttons: [
        {
          label: "확인",
          onClick: () => {
            deleteEmployeeMutation();
          },
        },
        {
          label: "취소",
        },
      ],
    });
  };
  const phoneNumberRef = register("phoneNumber", {
    required: "전화번호를 입력해주세요.",
    pattern: {
      value: PhoneRegex,
      message: "xxx-xxxx-xxxx 양식에 맞게 입력해주세요.",
    },
  });

  return (
    <SEmployeeCard>
      <ImageBox>
        <Avatar
          src={
            avatarURL
              ? avatarURL
              : isDarkMode
              ? "/images/dark_avatar.png"
              : "/images/avatar.png"
          }
        />
      </ImageBox>
      <FieldContainer>
        <FieldBox name="이름" value={name} accent={true} />
        <FieldBox name="성별" value={sex} />
        <FieldBox name="나이" value={age} />
        <FieldBox name="시급" value={wage} />
        <FieldBox name="전화번호" value={phoneNumber} />
        {list === "true" ? (
          <FieldBox
            name="월급"
            value={`${parseInt(salary).toLocaleString()}원`}
          />
        ) : null}
      </FieldContainer>

      {list === "true" ? (
        <Icons>
          <StyledPopup
            trigger={
              <button>
                <BiCalendarCheck />
              </button>
            }
            modal
            position="center"
          >
            {(close) => (
              <WorkdayCheck
                storeId={storeId}
                employeeId={id}
                salary={salary}
                name={name}
              />
            )}
          </StyledPopup>
          <StyledPopup
            trigger={
              <button>
                <HiPencilAlt />
              </button>
            }
            modal
            position="center"
          >
            {(close) => (
              <FormBox>
                <InputCard>
                  <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
                    <div>
                      <label htmlFor="avatar2">
                        <Avatar src={preview} />
                      </label>
                      <input
                        style={{ display: "none" }}
                        {...register("file")}
                        type="file"
                        id="avatar2"
                        onChange={(e) => {
                          readImage(e.target);
                          setValue("file", e.target.files);
                        }}
                      />
                    </div>
                    <div>
                      <input
                        {...register("name", {
                          required: "이름을 입력해주세요.",
                        })}
                        type="text"
                        placeholder="이름"
                      />
                      <select {...register("sex")}>
                        <option value="남자">남자</option>
                        <option value="여자">여자</option>
                      </select>
                      <input
                        {...register("age", {
                          required: "나이를 입력해주세요.",
                          pattern: {
                            value: onlyNumberRegex,
                            message: "숫자만 입력해주세요.",
                          },
                        })}
                        type="text"
                        placeholder="나이"
                      />
                      <input
                        {...register("wage", {
                          required: "시급을 입력해주세요.",
                          pattern: {
                            value: onlyNumberRegex,
                            message: "숫자만 입력해주세요.",
                          },
                        })}
                        type="text"
                        placeholder="시급"
                      />
                      <input
                        {...phoneNumberRef}
                        type="text"
                        placeholder="전화번호"
                        onChange={(e) => {
                          clearErrors("result");
                          phoneNumberRef.onChange(e);
                        }}
                      />
                      <Button type="submit">확인</Button>
                    </div>
                  </form>
                </InputCard>
                <CloseButton onClick={close}>&times;</CloseButton>
              </FormBox>
            )}
          </StyledPopup>
          <HiOutlineX onClick={deleteAlert} />
        </Icons>
      ) : null}
    </SEmployeeCard>
  );
};

export default EmployeeCard;
