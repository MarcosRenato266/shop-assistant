import React from "react";
import styled from "styled-components";
import { PageHeader, Tag, Button, Modal } from "antd";

const { confirm } = Modal;

const ItemMenuArea = styled.div`
  .ant-btn-primary {
    background: #5c3085 !important;
    border: none !important;
  }
  .ant-page-header {
    padding: 16px 9px !important;
  }
`;

export default function ItensPageHeader(props) {
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

  function showStatusTag() {
    if (props.error) {
      return <Tag color="red">Error</Tag>;
    } else {
      return props.loading ? (
        <Tag color="blue">Carregando ...</Tag>
      ) : (
        <Tag color="green">Atualizado</Tag>
      );
    }
  }

  return (
    <ItemMenuArea>
      <PageHeader
        onBack={() => window.history.back()}
        title="Gerenciar Itens"
        tags={showStatusTag()}
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
