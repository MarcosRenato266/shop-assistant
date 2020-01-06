import React from "react";
import styled from "styled-components";

const ItemSafeArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  span {
    color: #fff;
    opacity: 0.3;
    font-size: 14px;
    margin-top: 10px;
  }
`;

const FunctionsIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 15px;
  padding: 5px;
  font-weight: 400;
  border: 2px solid transparent;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  div {
    background: ${props => props.color || "#fff"};
    border-radius: 10px;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    :before {
      content: "${props => props.label}";
      position: absolute;
      font-size: 77px;
      font-weight: 800;
      letter-spacing: 15px;
      opacity: 0.2;
      left: -10px;
      top: 50%;
      -webkit-transform: translateY(50%);
      -ms-transform: translateY(50%);
      transform: translateY(-50%);
    }
  }
  :hover {
    border: 2px solid ${props => props.color || "#fff"};
    cursor: pointer;
  }
`;

export default function ItemMenu(props) {
  return (
    <ItemSafeArea>
      <FunctionsIcon color={props.color} label={props.label}>
        <div>{props.label}</div>
      </FunctionsIcon>
      <span>{props.title}</span>
    </ItemSafeArea>
  );
}
