import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { EDIT_PROFILE_MUTATION } from "../../apollo/mutation/user";
import { SEE_PROFILE_QUERY } from "../../apollo/queries/user";
import Avatar from "../Avatar";

const FormBox = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormWrapper = styled.div`
  padding: 24px;
  label:nth-child(1) {
    font-size: 18px;
    color: ${(props) => props.theme.fontColor};
  }
`;

const AvatarInput = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
`;

const AvatarLabel = styled.label`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.login.btnBgColor};
  color: ${(props) => props.theme.login.btnFontColor};
  cursor: pointer;
`;

const AvatarEdit = ({ children, avatarURL, id }) => {
  const history = useHistory();
  const { register, handleSubmit, setValue, setError } = useForm({
    mode: "onChange",
  });
  const [preview, setPreview] = useState(avatarURL);

  useEffect(() => {
    setPreview(avatarURL);
  }, [avatarURL]);

  const onCompleted = (data) => {
    if (data?.editProfile?.ok) {
      history.push(`/users/${data?.editProfile?.id}`);
    } else {
      setError("result", { message: data?.editProfile?.error });
    }
  };
  const [editProfileMutation, { loading }] = useMutation(
    EDIT_PROFILE_MUTATION,
    {
      onCompleted,
      refetchQueries: [{ query: SEE_PROFILE_QUERY, variables: { id } }],
    }
  );
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    editProfileMutation({
      variables: {
        file: data?.file[0],
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
  return (
    <FormBox>
      <Form onSubmit={handleSubmit(onSubmitValid)}>
        <FormWrapper>
          <label>Avatar</label>
          <AvatarInput>
            <Avatar url={preview} exist={preview} />
            <AvatarLabel htmlFor="avatar"> Choose photo</AvatarLabel>
            <input
              style={{ display: "none" }}
              {...register("file")}
              id="avatar"
              type="file"
              onChange={(e) => {
                readImage(e.target);
                setValue("file", e.target.files);
              }}
            />
          </AvatarInput>
        </FormWrapper>
        {children}
      </Form>
    </FormBox>
  );
};

export default AvatarEdit;
