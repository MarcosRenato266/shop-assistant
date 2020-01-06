import React from "react";
import styled from "styled-components";
import MenuInfoPanel from "./MenuInfoPanel";
import ItemMenu from "./ItemMenu";

const MainMenuArea = styled.div`
  width: 100%;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WelcomeHeader = styled.div`
  color: #fff;
  h1 {
    font-weight: 400;
    margin-bottom: 0;
    line-height: 13px;
  }
  h3 {
    font-size: 14px;
    opacity: 0.2;
    font-weight: 100;
  }
`;

const FunctionsArea = styled.div`
  margin-top: 35px;
  color: #fff;
  h3 {
    font-size: 22px;
    font-weight: 400;
  }
`;

const FunctionsIconsArea = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function index() {
  return (
    <MainMenuArea>
      <WelcomeHeader>
        <h1>Olá Administrador</h1>
        <h3>Bem-vindo(a) ao painel administrativo ShopAssistant.</h3>
        <MenuInfoPanel />
      </WelcomeHeader>
      <FunctionsArea>
        <h3>Ferramentas</h3>
        <FunctionsIconsArea>
          <ItemMenu label="Itm" title="Ger. Items" color="#2db92b" />
          <ItemMenu label="Bld" title="Ger. Builds" color="#b9382b" />
          <ItemMenu label="Prc" title="Ger. Preços" color="#2ba5b9" />
        </FunctionsIconsArea>
      </FunctionsArea>
    </MainMenuArea>
  );
}
