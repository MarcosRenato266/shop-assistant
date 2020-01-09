import React from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const MainLoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const LoginPanelArea = styled.div`
  width: 40%;
  height: 100%;
  background: #1a121e;
  display: flex;
  flex-direction: column;
  img {
    max-width: 200px;
    align-self: center;
  }
`;

const PanelHolder = styled.div`
  width: 85%;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  h1 {
    color: #fff !important;
    margin-bottom: 20px !important;
  }
  .ant-btn-primary {
    background: #5d3086 !important;
    border: 0 !important;
    font-size: 17px;
    width: -webkit-fill-available;
  }
  .ant-input {
    width: -webkit-fill-available !important;
  }
`;

const FooterHolder = styled.div`
  width: 100%;
  color: #fff;
  opacity: 0.2;
  text-align: center;
  padding-bottom: 15px;
  margin-top: auto;
`;

const ArtPanelArea = styled.div`
  width: 60%;
  height: 100%;
  background: rgba(43, 29, 43, .8);
  background: linear-gradient(
    155deg,
    rgba(43, 29, 43, .8) 0%,
    rgba(28, 21, 36, .8) 100%
  );
  position: relative;

  :after {
    content: "";
    background: url("/img/login-bg.jpg")no-repeat center center / cover;
    opacity: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
`;

export default () => (
  <MainLoginWrapper>
    <LoginPanelArea>
      <img src="/img/logo_glow.png" />
      <PanelHolder>
        <h1>Login</h1>
        <LoginForm />
      </PanelHolder>
      <FooterHolder>
        <small>ShopAssistant App - Made with love in Brazil</small>
        <br />
        <small>
          Todos os Direitos de imagem e demais itens reservados a Shop Titans
        </small>
      </FooterHolder>
    </LoginPanelArea>
    <ArtPanelArea>asdaaa</ArtPanelArea>
  </MainLoginWrapper>
);
