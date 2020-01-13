import React from "react";
import styled from "styled-components";
import { Icon, Tooltip } from "antd";

const BuildItemAuthor = styled.div`
  background: ${props => (props.isPerfect ? "#febb12" : "#2e3462")};
  height: 30px;
  width: 30px;
  border-radius: 7px;
  font-size: 20px;
  color: #202442;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BuildItemContent = styled.div`
  padding: 5px;
  margin-left: 10px;
  color: #fff;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 100;
  font-size: 10px;
  span {
    font-weight: 100;
    letter-spacing: 0;
    text-transform: capitalize;
    font-size: 14px;
    color: ${props => props.rarity};
  }
  p {
    font-weight: 100;
    letter-spacing: 0;
    text-transform: initial;
    font-size: 12px;
    color: #3f4777;
  }
`;

const RunesCombineDivider = styled.div`
  font-size: 50px;
  font-weight: bold;
  color: #2e3463;
`;

const RunesCombine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 40px;
    }
    span {
      font-size: 10px;
      text-align: center;
      color: #fff;
      overflow-wrap: break-word;
    }
  }
`;

const BuildItemRow = styled.div`
  display: flex;
`;

const BuildItem = styled.div`
  border-bottom: 1px solid #2c325a;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-bottom: 15px;
  border-left: 2px solid transparent;
  transition: all 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  :hover {
    border-left: 2px solid #2daf2b;
  }
  ${BuildItemAuthor} {
  }
  ${BuildItemContent} {
    flex: 1;
  }
  &.active {
    border-left: 2px solid #2daf2b;
    background: #2daf2b;
    ${BuildItemContent} {
      span {
        background: #ffffff;
        padding: 2px 5px;
        border-radius: 4px;
      }
    }
    ${RunesCombineDivider}{
      color: #3a7d20;
    }
  }
`;

export default function BuildItemCard(props) {
  function returnColorByRarity(rarity) {
    switch (rarity) {
      case "Legendary":
        return "#febb12";
      case "Epic":
        return "#c412fe";
      case "Magistral":
        return "#12bdfe";
      case "Superior":
        return "#2bfe12";
      default:
        return "#464f92";
    }
  }

  return (
    <BuildItem
      className={props.active ? "active" : undefined}
      style={{ order: props.order }}
    >
      <BuildItemRow>
        <Tooltip
          placement="left"
          title={props.isPerfect ? "Author Indication" : "User Submition"}
        >
          <BuildItemAuthor isPerfect={props.isPerfect}>
            {props.isPerfect ? <Icon type="crown" /> : <Icon type="user" />}
          </BuildItemAuthor>
        </Tooltip>
        <BuildItemContent rarity={returnColorByRarity(props.rarity)}>
          Rarity: <span>{props.rarity}</span>
        </BuildItemContent>
      </BuildItemRow>
      <RunesCombine>
        <div>
          <img src={`${props.itemImage}`} />
          <span>{props.itemName}</span>
        </div>
        <RunesCombineDivider> = </RunesCombineDivider>
        <div>
          <img src={`${props.runeImage}`} />
          <span>{props.runeName}</span>
        </div>
        <RunesCombineDivider>+</RunesCombineDivider>
        <div>
          <img src={`${props.spirityRuneImage}`} />
          <span>{props.spirityRuneName}</span>
        </div>
      </RunesCombine>
    </BuildItem>
  );
}
