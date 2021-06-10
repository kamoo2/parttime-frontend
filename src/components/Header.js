import { useReactiveVar } from "@apollo/client";
import { SiAwesomelists } from "react-icons/si";
import { FiLogOut, FiUser } from "react-icons/fi";
import { RiStore3Line } from "react-icons/ri";
import styled from "styled-components";
import { isLoggedInVar, logOut } from "../apollo";
import { RubikFont } from "../fonts";
import DarkModeBtn from "./DarkModeBtn";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid black;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 20px 0;
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
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <SHeader>
      <Wrapper>
        <LogoBox>
          <SiAwesomelists size={40} />
          <Title>PTMM</Title>
          <DarkModeBtn />
        </LogoBox>
        {isLoggedIn ? (
          <MenuBox>
            <Icon>
              <FiUser size={31} />
            </Icon>
            <Icon>
              <RiStore3Line size={31} />
            </Icon>
            <Icon>
              <FiLogOut size={31} onClick={() => logOut()} />
            </Icon>
          </MenuBox>
        ) : null}
      </Wrapper>
    </SHeader>
  );
};

export default Header;
