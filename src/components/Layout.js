import styled from "styled-components";
import Header from "./Header";

const Content = styled.div``;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
