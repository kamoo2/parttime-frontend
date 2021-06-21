import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isLoggedInVar, logOut } from "../apollo/vars";

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      email
      name
      phoneNumber
      avatarURL
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const history = useHistory();
  const { data, loading } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logOut(history);
    }
  }, [data, history]);
  return { data, loading };
}
export default useUser;
