import React from "react";
import styled from "styled-components";

const ActionsWrapper = styled.div`
  padding: 15px;
  height: 28px;
  background: #2e325a;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ItemIdentification = styled.div`
  display: flex;
  color: #4a5192;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 100;
  font-size: 12px;
  span {
    color: #fff;
    font-weight: 400;
    margin-left: 5px;
  }
`;

const VerticalDivider = styled.div`
  background: #525686;
  width: 1px;
  margin: 0 10px;
`;

export default function ActionArea(props) {
  function returnLengthOrZero(value) {
    return value ? value.length : 0;
  }
  return (
    <ActionsWrapper>
      <ItemIdentification>
        Item ID: <span>{props.selectedItem.internalId}</span>
        <VerticalDivider />
        Name/Tier:
        <span>
          {props.selectedItem.name} - {props.selectedItem.tier}
        </span>
        <VerticalDivider />
        Builds:
        <span>{returnLengthOrZero(props.selectedItem.perfectBuild)}</span>
        <VerticalDivider />
        Heroes Usage:
        <span>{returnLengthOrZero(props.selectedItem.heroesThatCanUse)}</span>
      </ItemIdentification>
    </ActionsWrapper>
  );
}
