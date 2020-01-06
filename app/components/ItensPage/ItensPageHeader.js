import React from "react";
import styled from "styled-components";
import { PageHeader, Tag, Button, Modal } from "antd";

const { confirm } = Modal;

const ItemMenuArea = styled.div`
  .ant-btn-primary {
    background: #5c3085 !important;
    border: none !important;
  }
  .ant-page-header{
    padding: 16px 9px !important;
  }
`;

export default function ItensPageHeader() {
  function confirmUpdateItens() {
    confirm({
      title: "Você tem certeza que quer fazer isso?",
      content:
        "Esse processo afeta completamente TODOS os itens do sistema, é aconselhado o uso somente em casos que o jogo tenha atualizado itens ou criados novos.",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  return (
    <ItemMenuArea>
      <PageHeader
        onBack={() => window.history.back()}
        title="Gerenciar Itens"
        tags={<Tag color="green">Atualizado</Tag>}
        extra={[
          <Button
            type="primary"
            shape="circle"
            icon="sliders"
            onClick={confirmUpdateItens}
          />
        ]}
      />
    </ItemMenuArea>
  );
}
