import { useMutation, useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { HiPencilAlt, HiOutlineX } from "react-icons/hi";
import { BiCalendarCheck } from "react-icons/bi";
import Popup from "reactjs-popup";
import { darkModeVar } from "../../apollo/vars";
import FieldBox from "../employee/FieldBox";
import { useForm } from "react-hook-form";
import { useState } from "react/cjs/react.development";
import {
  DELETE_EMPLOYEE_MUTATION,
  UPDATE_EMPLOYEE_MUTATION,
} from "../../apollo/mutation/employee";
import { SEE_EMPLOYEES_QUERY } from "../../apollo/queries/employee";
import { store } from "react-notifications-component";
import { confirmAlert } from "react-confirm-alert";
import WorkdayCheck from "./WorkdayCheck";

const SEmployeeCard = styled.div`
  width: 100%;
  padding: 30px 10px;
  border: 2px solid ${(props) => props.theme.borderColor};
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
  const [preview, setPreview] = useState(avatarURL);

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      name,
      sex,
      age,
      wage,
      phoneNumber,
    },
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
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const newAge = parseInt(data.age);
    const newWage = parseInt(data.wage);
    updateEmployeeMutation({
      variables: {
        id,
        ...(name !== data.name && { name: data.name }),
        ...(age !== newAge && { age: newAge }),
        ...(wage !== newWage && { wage: newWage }),
        ...(sex !== data.sex && { sex: data.sex }),
        ...(phoneNumber !== data.phoneNumber && {
          phoneNumber: data.phoneNumber,
        }),
        ...(data.file.length === 1 && { file: data.file[0] }),
      },
    });
    store.addNotification({
      title: "✅",
      message: `${name}님의 정보가 변경되었습니다.`,
      type: "default",
      container: "bottom-center",
      dismiss: {
        duration: 3000,
      },
    });
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
            store.addNotification({
              title: "✅",
              message: `${name}님이 삭제되었습니다.`,
              type: "success",
              container: "bottom-center",
              dismiss: {
                duration: 3000,
              },
            });
          },
        },
        {
          label: "취소",
        },
      ],
    });
  };

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
                  <form onSubmit={handleSubmit(onSubmitValid)}>
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
                          console.log("ss");
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
                        })}
                        type="text"
                        placeholder="나이"
                      />
                      <input
                        {...register("wage", {
                          required: "시급을 입력해주세요.",
                        })}
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

                      <Button type="submit">확인</Button>
                    </div>
                  </form>
                </InputCard>
                <CloseButton onClick={close}>&times;</CloseButton>
              </FormBox>
            )}
          </StyledPopup>
          <HiOutlineX onClick={() => deleteAlert()} />
        </Icons>
      ) : null}
    </SEmployeeCard>
  );
};

export default EmployeeCard;
