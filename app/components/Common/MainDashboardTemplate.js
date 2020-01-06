import React from "react";
import styled from "styled-components";
import MainMenu from "../MainMenu";

const MainDashboardWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: rgb(43, 29, 43);
  background: linear-gradient(
    155deg,
    rgba(43, 29, 43, 1) 0%,
    rgba(28, 21, 36, 1) 100%
  );
`;

const DashboardSafeArea = styled.div`
  width: 100%;
  padding: 35px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
`;

const DashboardMenuArea = styled.div`
  width: 40%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LogoImage = styled.img`
  max-width: 150px;
  margin-top: -50px;
  margin-left: -40px;
  margin-bottom: -50px;
`;

const FooterHolder = styled.div`
  width: 100%;
  color: #fff;
  opacity: 0.2;
  text-align: left;
  padding-bottom: 15px;
  margin-top: auto;
`;

const DashboardWorkArea = styled.div`
  width: 55%;
  height: 100%;
  background: #fff;
  padding-left: 15px;
  padding-top: 15px;
  padding-right: 15px;
  border-radius: 25px;
  overflow: scroll;
`;

export default function MainDashboardTemplate(props) {
  return (
    <MainDashboardWrapper>
      <DashboardSafeArea>
        <DashboardMenuArea>
          <LogoImage src="/img/logo_glow.png" />
          <MainMenu />
          <FooterHolder>
            <small>ShopAssistant App - Made with love in Brazil</small>
            <br />
            <small>
              Todos os Direitos de imagem e demais itens reservados a Shop
              Titans
            </small>
          </FooterHolder>
        </DashboardMenuArea>
        <DashboardWorkArea>{props.children}</DashboardWorkArea>
      </DashboardSafeArea>
    </MainDashboardWrapper>
  );
}
