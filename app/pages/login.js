import React from "react";
import styled from "styled-components";
import { Form, Icon, Input, Button, Checkbox } from "antd";

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
    color: #fff;
  }
  .ant-btn-primary{
    background: #5d3086 !important;
    border: 0 !important;
    font-size: 17px;
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
  background: rgb(43, 29, 43);
  background: linear-gradient(
    155deg,
    rgba(43, 29, 43, 1) 0%,
    rgba(28, 21, 36, 1) 100%
  );
`;

export default () => (
  <MainLoginWrapper>
    <LoginPanelArea>
      <img src="/img/logo_glow.png" />
      <PanelHolder>
        <h1>Login</h1>
        <Form onSubmit={() => {}}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
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
