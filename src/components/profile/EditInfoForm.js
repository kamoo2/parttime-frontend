import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { MUTATION_EDIT_PROFILE } from "../../apollo/mutation/user";
import { EmailRegex, PhoneRegex } from "../../regaxs";
import FormError from "../auth/FormError";

function EditInfoForm({ id, username, name, phoneNumber, email, avatarURL }) {
  const history = useHistory();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
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
        ...(newData?.avatarURL.length === 1 && {
          file: newData?.avatarURL[0],
        }),
      },
    });
  };
  const onCompleted = (data) => {
    if (data?.editProfile?.ok) {
      history.push(`/users/${data?.editProfile?.username}`);
    }
  };
  const [editProfileMutation] = useMutation(MUTATION_EDIT_PROFILE, {
    onCompleted,
    update: (cache, result) => {
      const { email, name, phoneNumber } = getValues();
      console.log(result);
      const {
        data: {
          editProfile: { ok, username, avatarURL },
        },
      } = result;
      if (ok) {
        const fragmentId = `User:${id}`;
        const fragment = gql`
          fragment BSName on User {
            username
            email
            name
            phoneNumber
            avatarURL
          }
        `;
        cache.writeFragment({
          id: fragmentId,
          fragment,
          data: {
            username,
            email,
            name,
            phoneNumber,
            avatarURL,
          },
        });
      }
    },
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
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmitEditProfile)}>
      <input
        {...usernameRef}
        type="text"
        placeholder="Username"
        defaultValue={username}
      />
      <FormError message={errors?.username?.message} />
      <input
        {...register("name", { required: "name을 입력해주세요." })}
        type="text"
        placeholder="Name"
        defaultValue={name}
      />
      <FormError message={errors?.name?.message} />
      <input
        {...phoneNumberRef}
        type="text"
        placeholder="PhoneNumber"
        defaultValue={phoneNumber}
      />
      <FormError message={errors?.phoneNumber?.message} />
      <input
        {...emailRef}
        type="text"
        placeholder="Email"
        defaultValue={email}
      />
      <FormError message={errors?.email?.message} />
      <input {...register("avatarURL")} type="file" />
      <button type="onSubmit">Edit</button>
    </form>
  );
}

export default EditInfoForm;
