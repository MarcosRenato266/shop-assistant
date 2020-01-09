import React from "react";
import styled from "styled-components";
import { Icon } from "antd";

export default function index(props) {
  return (
    <div>
      {props.item ? props.item : <Icon type="experiment" theme="twoTone" />}
    </div>
  );
}
