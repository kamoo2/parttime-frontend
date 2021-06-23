import { useReactiveVar } from "@apollo/client";
import { SiAwesomelists } from "react-icons/si";
import { FiLogOut, FiUser } from "react-icons/fi";
import { RiStore3Line } from "react-icons/ri";
import styled from "styled-components";
import { RubikFont } from "../fonts";
import DarkModeBtn from "./DarkModeBtn";
import { Link, useHistory } from "react-router-dom";
import routes from "../routes";
import Wrapper from "./header/Wrapper";
import { isLoggedInVar, logOut } from "../apollo/vars";
import useUser from "../hooks/useUser";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled(RubikFont)`
  font-size: 30px;
  margin: 0 10px;
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;
const Header = () => {
  const history = useHistory();
  const { data } = useUser();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <SHeader>
      <Wrapper>
        <LogoBox>
          <Link
            to={routes.home}
            style={{ display: "flex", alignItems: "center" }}
          >
            <SiAwesomelists size={40} />
            <Title>PTMM</Title>
          </Link>
          <DarkModeBtn />
        </LogoBox>
        {isLoggedIn ? (
          <MenuBox>
            <Icon>
              <Link
                to={{
                  pathname: `/users/${data?.me?.id}`,
                }}
              >
                <FiUser size={31} />
              </Link>
            </Icon>
            <Icon>
              <Link to={routes.storeAdd}>
                <RiStore3Line size={31} />
              </Link>
            </Icon>
            <Icon>
              <FiLogOut size={31} onClick={() => logOut(history)} />
            </Icon>
          </MenuBox>
        ) : null}
      </Wrapper>
    </SHeader>
  );
};

export default Header;
