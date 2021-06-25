import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { EDIT_PROFILE_MUTATION } from "../../apollo/mutation/user";
import { SEE_PROFILE_QUERY } from "../../apollo/queries/user";
import { EmailRegex, PhoneRegex } from "../../regaxs";
import FormError from "../auth/FormError";
import Wrapper from "../createStore/Wrapper";
import AvatarEdit from "./AvatarEdit";
import Content from "./Content";
import { store } from "react-notifications-component";

const InputItems = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-gap: 1.5rem;
  margin-bottom: 15px;
  div:nth-child(1) {
    grid-column: 1/4;
  }
  div:nth-child(2) {
    grid-column: 4/7;
  }
`;

const InputItem = styled.div`
  width: 100%;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  label {
    font-size: 18px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.fontColor};
  }
  input {
    border: 1px solid lightgray;
    border-radius: 3px;
    padding: 8px 12px;
    color: ${(props) => props.theme.fontColor};
  }
`;

const FormWrapper = styled.div`
  padding: 24px;
`;

const ButtonBox = styled.div`
  background-color: rgba(229, 231, 235, 0.3);
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  button {
    padding: 8px 12px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.login.btnBgColor};
    color: ${(props) => props.theme.login.btnFontColor};
  }
`;

const Form = styled.form``;

function EditInfoForm({ id, username, name, phoneNumber, email, avatarURL }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
  } = useForm({ mode: "onChange" });

  const onSubmitEditProfile = (newData) => {
    editProfileMutation({
      variables: {
        ...(username !== newData?.username && {
          username: newData?.username,
        }),
        ...(name !== newData?.name && {
          name: newData?.name,
        }),
        ...(email !== newData?.email && {
          email: newData?.email,
        }),
        ...(phoneNumber !== newData?.phoneNumber && {
          phoneNumber: newData?.phoneNumber,
        }),
      },
    });
  };
  const onCompleted = (data) => {
    const { username } = getValues();
    if (data?.editProfile?.ok) {
      store.addNotification({
        title: "✅",
        message: `${username}님의 정보가 변경되었습니다.`,
        type: "success",
        container: "top-center",
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      history.push(`/users/${data?.editProfile?.id}`);
    } else {
      setError("result", { message: data?.editProfile?.error });
    }
  };
  const [editProfileMutation] = useMutation(EDIT_PROFILE_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_PROFILE_QUERY, variables: { id } }],
  });

  const usernameRef = register("username", {
    required: "username을 입력해주세요.",
    minLength: {
      value: 5,
      message: "5자이상 입력해주세요.",
    },
  });
  const emailRef = register("email", {
    required: "email을 입력해주세요.",
    pattern: {
      value: EmailRegex,
      message: "이메일 형식에 맞지 않습니다.",
    },
  });

  const phoneNumberRef = register("phoneNumber", {
    pattern: {
      value: PhoneRegex,
      message: "xxx-xxxx-xxxx양식에 맞게 입력해주세요.",
    },
  });
  return (
    <Wrapper>
      <Content title="Account Information">
        <Form onSubmit={handleSubmit(onSubmitEditProfile)}>
          <FormWrapper>
            <InputItems>
              <InputItem>
                <label htmlFor="username">Username</label>
                <input
                  {...usernameRef}
                  id="username"
                  type="text"
                  placeholder="Username"
                  defaultValue={username}
                  onChange={(e) => {
                    clearErrors("result");
                    usernameRef.onChange(e);
                  }}
                />
                <FormError message={errors?.username?.message} />
              </InputItem>
              <InputItem>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  {...register("name", { required: "name을 입력해주세요." })}
                  type="text"
                  placeholder="Name"
                  defaultValue={name}
                />
                <FormError message={errors?.name?.message} />
              </InputItem>
            </InputItems>
            <InputItems>
              <InputItem>
                <label htmlFor="phoneNumber">PhoneNumber</label>
                <input
                  id="phoneNumber"
                  {...phoneNumberRef}
                  type="text"
                  placeholder="PhoneNumber"
                  defaultValue={phoneNumber}
                  onChange={(e) => {
                    clearErrors("result");
                    phoneNumberRef.onChange(e);
                  }}
                />
                <FormError message={errors?.phoneNumber?.message} />
              </InputItem>
              <InputItem>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  {...emailRef}
                  type="text"
                  placeholder="Email"
                  defaultValue={email}
                  onChange={(e) => {
                    clearErrors("result");
                    emailRef.onChange(e);
                  }}
                />
                <FormError message={errors?.email?.message} />
              </InputItem>
            </InputItems>
          </FormWrapper>
          <ButtonBox>
            <button type="onSubmit">Save</button>
            <FormError message={errors?.result?.message} />
          </ButtonBox>
        </Form>
      </Content>
      <Content title="Avatar">
        <AvatarEdit avatarURL={avatarURL} id={id}>
          <ButtonBox>
            <button type="onSubmit">Upload & Save</button>
            <FormError message={errors?.result?.message} />
          </ButtonBox>
        </AvatarEdit>
      </Content>
    </Wrapper>
  );
}

export default EditInfoForm;
