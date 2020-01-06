import React from "react";
import styled from "styled-components";
import { PageHeader, Tag, Button, Modal } from "antd";

const { confirm } = Modal;

const BuildMenuArea = styled.div`
  .ant-btn-primary {
    background: #5c3085 !important;
    border: none !important;
  }
  .ant-page-header{
    padding: 16px 9px !important;
  }
`;

export default function ItensPageHeader() {
  

  return (
    <BuildMenuArea>
      <PageHeader
        onBack={() => window.history.back()}
        title="Gerenciar Builds"
        tags={<Tag color="green">Atualizado</Tag>}
        extra={[
          <Button
            type="primary"
            shape="circle"
            icon="sliders"
          />
        ]}
      />
    </BuildMenuArea>
  );
}
