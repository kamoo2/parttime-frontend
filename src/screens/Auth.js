import { useMutation, useReactiveVar } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import AuthBox from "../components/auth/AuthBox";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Container from "../components/auth/Container";
import FieldName from "../components/auth/FieldName";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import LeftBox from "../components/auth/LeftBox";
import ActiveLine from "../components/auth/line/ActiveLine";
import NoLine from "../components/auth/line/NoLine";
import RightBox from "../components/auth/RightBox";
import TitleBox from "../components/TitleBox";
import Wrapper from "../components/auth/Wrapper";
import PageTitle from "../components/PageTitle";
import { EmailRegex, PwRegex } from "../regaxs";
import {
  disableLoginMode,
  enableLoginMode,
  logIn,
  loginModeVar,
} from "../apollo/vars";
import {
  MUTATION_CREATE_ACCOUNT,
  MUTATION_LOGIN,
} from "../apollo/mutation/user";
import { store } from "react-notifications-component";

const LogoName = styled.span`
  color: ${(props) => props.theme.login.CardFontColor};
  transition: all 0.5s ease;
  font-size: 40px;
`;

const AuthBtn = styled.button`
  font-size: 16px;
  padding: 0 15px;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 700px;
`;

const Auth = () => {
  const loginMode = useReactiveVar(loginModeVar);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
    getValues,
    setValue,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const enableLoginHandle = () => {
    reset();
    enableLoginMode();
  };

  const disableLoginHandle = () => {
    setValue("username", "");
    setValue("name", "");
    setValue("email", "");
    setValue("password", "");
    disableLoginMode();
  };

  const signupCompleted = () => {
    const { username, password } = getValues();
    store.addNotification({
      title: "✅",
      message: `${username}님의 계정이 생성되었습니다.`,
      type: "success",
      container: "top-center",
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
    reset({ username, password });
    enableLoginMode();
  };

  const LoginOnCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("result", { message: error });
      return;
    }
    if (token) {
      const { username } = getValues();
      store.addNotification({
        title: "✅",
        message: `${username}님 로그인 되었습니다.`,
        type: "success",
        container: "top-center",
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      logIn(token);
    }
  };

  const SignupOnCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      setError("result", { message: error });
      return;
    }
    signupCompleted();
  };

  const [login, { loading: loginLoading }] = useMutation(MUTATION_LOGIN, {
    onCompleted: LoginOnCompleted,
  });

  const [createAccount, { loading: signupLoading }] = useMutation(
    MUTATION_CREATE_ACCOUNT,
    {
      onCompleted: SignupOnCompleted,
    }
  );

  const onValid = (data) => {
    if (loginMode ? loginLoading : signupLoading) {
      return;
    }
    loginMode
      ? login({
          variables: {
            ...data,
          },
        })
      : createAccount({
          variables: {
            ...data,
          },
        });
  };

  const username = loginMode
    ? register("username", { required: "username을 입력해주세요." })
    : register("username", {
        required: "username을 입력해주세요.",
        minLength: {
          value: 5,
          message: "5자 이상을 입력해주세요.",
        },
      });

  const password = loginMode
    ? register("password", {
        required: "password를 입력해주세요.",
      })
    : register("password", {
        required: "password를 입력해주세요.",
        pattern: {
          value: PwRegex,
          message: "특수문자,문자,숫자 포함 8~15 이내의 패스워드를 입력하세요.",
        },
      });

  const email = loginMode
    ? null
    : register("email", {
        required: "email을 입력해주세요.",
        pattern: {
          value: EmailRegex,
          message: "이메일 형식에 맞지 않습니다.",
        },
      });

  return (
    <AuthLayout>
      <PageTitle title="LOGIN" />
      <Container>
        <LeftBox>
          <LogoName>Part Time Management</LogoName>
          <LogoImg src="/images/logo.png" />
        </LeftBox>
        <RightBox>
          <Wrapper>
            <AuthBox>
              <AuthBtn onClick={() => enableLoginHandle()}>
                login
                {loginMode ? <ActiveLine /> : <NoLine />}
              </AuthBtn>
              <AuthBtn onClick={() => disableLoginHandle()}>
                signup
                {loginMode ? <NoLine /> : <ActiveLine />}
              </AuthBtn>
            </AuthBox>
            {loginMode ? (
              <TitleBox
                title="Login"
                subtitle="Please Login to Your Account."
                titleSize="25px"
                subSize="12px"
              />
            ) : (
              <TitleBox
                title="Sign Up"
                subtitle="Please Create a New Account"
                titleSize="25px"
                subSize="12px"
              />
            )}

            <FormBox>
              <form onSubmit={handleSubmit(onValid)}>
                {loginMode ? (
                  <>
                    <FieldName name="Username" />
                    <Input
                      {...username}
                      type="text"
                      hasError={Boolean(errors?.username?.message)}
                      onChange={(e) => {
                        clearErrors("result");
                        username.onChange(e);
                      }}
                    />
                    <FormError message={errors?.username?.message} />
                    <FieldName name="Password" />
                    <Input
                      {...password}
                      type="password"
                      hasError={Boolean(errors?.password?.message)}
                      onChange={(e) => {
                        clearErrors("result");
                        password.onChange(e);
                      }}
                    />
                    <FormError message={errors?.password?.message} />
                    <Button type="submit" value="로그인" disabled={!isValid} />
                    <FormError message={errors?.result?.message} />
                  </>
                ) : (
                  <>
                    <FieldName name="Username" />
                    <Input
                      {...username}
                      type="text"
                      hasError={Boolean(errors?.username?.message)}
                      onChange={(e) => {
                        clearErrors("result");
                        username.onChange(e);
                      }}
                    />
                    <FormError message={errors?.username?.message} />

                    <FieldName name="Name" />
                    <Input
                      {...register("name", {
                        required: "name은 필수 사항입니다.",
                      })}
                      type="text"
                      hasError={Boolean(errors?.name?.message)}
                    />
                    <FormError message={errors?.name?.message} />

                    <FieldName name="Email" />
                    <Input
                      {...email}
                      type="text"
                      hasError={Boolean(errors?.email?.message)}
                      onChange={(e) => {
                        clearErrors("result");
                        email.onChange(e);
                      }}
                    />
                    <FormError message={errors?.email?.message} />

                    <FieldName name="Password" />
                    <Input
                      {...password}
                      type="password"
                      hasError={Boolean(errors?.password?.message)}
                    />
                    <FormError message={errors?.password?.message} />
                    <Button
                      type="submit"
                      value="회원가입"
                      disabled={!isValid}
                    />
                    <FormError message={errors?.result?.message} />
                  </>
                )}
              </form>
            </FormBox>
          </Wrapper>
        </RightBox>
      </Container>
    </AuthLayout>
  );
};

export default Auth;
