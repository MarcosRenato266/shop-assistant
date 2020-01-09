import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const Header = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 100px;
    pointer-events: none;
  }
  .ant-btn {
    background: #7033ff;
    border: none;
    color: #fff;
    font-weight: 400;
  }
`;

export default function HeaderComponent() {
  return (
    <Header>
      <div>
        <img src="/img/logo-app.png" alt="Shop Assistant" />
      </div>
      <div>
        <Button shape="round" icon="credit-card" size="small">
          Donate
        </Button>
      </div>
    </Header>
  );
}
