import styled from "styled-components";
import Header from "./Header";

const Content = styled.div`
  margin-top: 100px;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
