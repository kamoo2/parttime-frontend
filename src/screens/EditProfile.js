import { useEffect } from "react";
import Wrapper from "../components/createStore/Wrapper";
import EditInfoForm from "../components/profile/EditInfoForm";
import useUser from "../hooks/useUser";

const EditProfile = () => {
  const { data: userData } = useUser();
  return (
    <Wrapper>
      <EditInfoForm {...userData?.me} />
    </Wrapper>
  );
};

export default EditProfile;
