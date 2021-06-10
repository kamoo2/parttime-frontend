import { useMutation, useReactiveVar } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  disableLoginMode,
  enableLoginMode,
  isLoggedInVar,
  logIn,
  loginModeVar,
} from "../apollo";
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
import TitleBox from "../components/auth/TitleBox";
import Wrapper from "../components/auth/Wrapper";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { CREATE_ACCOUNT, LOGIN } from "../gql/user";
import { EmailRegex, PwRegex } from "../regaxs";

const LogoName = styled.span`
  color: ${(props) => props.theme.login.lCardFontColor};
  transition: all 0.5s ease;
  font-size: 40px;
`;

const AuthBtn = styled.button`
  font-size: 16px;
  padding: 0 15px;
  cursor: pointer;
`;

const Auth = () => {
  const loginMode = useReactiveVar(loginModeVar);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const enableLoginHandle = () => {
    reset();
    enableLoginMode();
  };

  const disableLoginHandle = () => {
    reset();
    disableLoginMode();
  };

  const signupCompleted = () => {
    const { username, password } = getValues();
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

  const [login, { loading: loginLoading }] = useMutation(LOGIN, {
    onCompleted: LoginOnCompleted,
  });

  const [createAccount, { loading: signupLoading }] = useMutation(
    CREATE_ACCOUNT,
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
              />
            ) : (
              <TitleBox
                title="Sign Up"
                subtitle="Please Create a New Account"
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
                    />
                    <FormError message={errors?.username?.message} />
                    <FieldName name="Password" />
                    <Input
                      {...password}
                      type="password"
                      hasError={Boolean(errors?.password?.message)}
                    />
                    <FormError message={errors?.password?.message} />
                    <Button type="submit" value="로그인" />
                  </>
                ) : (
                  <>
                    <FieldName name="Username" />
                    <Input {...username} type="text" />
                    <FormError message={errors?.username?.message} />

                    <FieldName name="Name" />
                    <Input
                      {...register("name", {
                        required: "name은 필수 사항입니다.",
                      })}
                      type="text"
                    />
                    <FormError message={errors?.name?.message} />

                    <FieldName name="Email" />
                    <Input {...email} type="text" />
                    <FormError message={errors?.email?.message} />

                    <FieldName name="Password" />
                    <Input {...password} type="password" />
                    <FormError message={errors?.password?.message} />
                    <Button type="submit" value="회원가입" />
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
