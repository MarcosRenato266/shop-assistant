import React from "react";
import styled from "styled-components";
import LeftSideChooseItem from "./LeftSideChooseItem";

const MainContentHolder = styled.div`
  background: #25294a;
  width: 100%;
  height: 100vh;
  color: #fff !important;
  display: flex;
`;

const LeftSideBar = styled.div`
  background: #202442;
  width: 25%;
  height: inherit;
`;

export default function index(props) {
  return (
    <MainContentHolder>
      <LeftSideBar>
        <LeftSideChooseItem setSelectedItem={props.setSelectedItem} />
      </LeftSideBar>
      {props.children}
    </MainContentHolder>
  );
}
