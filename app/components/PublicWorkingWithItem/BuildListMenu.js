import React from "react";
import styled from "styled-components";
import { Icon, Tooltip } from "antd";
import BuildItemCard from "./BuildItemCard";

const BuildsListArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  background: #202442;
`;

const BuildScrollableList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 15px;
  overflow-y: scroll;
`;

const BuildListActions = styled.div`
  padding: 15px;
  border-bottom: 1px solid #2e325a;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    display: flex;
    align-items: center;
    z-index: 99;
    transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    letter-spacing: 2px;
    text-transform: uppercase;
    :hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
  .NewBuild {
    width: 27px;
    height: 27px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4d9447;
    margin-left: 5px;
  }
`;

const UserEditHerBuild = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  font-size: 28px;
  background: #046ef6;
  position: fixed;
  right: 15px;
  bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function BuildListMenu(props) {
  function returnOrder(isPerfect, rarity) {
    switch (rarity) {
      case "Legendary":
        return "1";
      case "Epic":
        return "2";
      case "Magistral":
        return "3";
      case "Superior":
        return "4";
      default:
        return "5";
    }
  }

  return (
    <BuildsListArea>
      <BuildListActions>
        <span>
          Submit New Build
          <div className="NewBuild">
            <Icon type="plus" />
          </div>
        </span>
      </BuildListActions>
      <BuildScrollableList>
        {props.selectedItem.perfectBuild.map(build => (
          <span
            key={build.id}
            onClick={() => props.setSelectedBuild(build.id)}
            style={{
              order: returnOrder(build.isPerfect, build.rarity),
              cursor: "pointer"
            }}
          >
            <BuildItemCard
              active={props.SelectedBuild === build.id}
              isPerfect={build.isPerfect}
              rarity={build.rarity}
              itemImage={props.selectedItem.itemImage}
              itemName={props.selectedItem.name}
              runeImage={build.perfectRune.itemImage}
              runeName={build.perfectRune.name}
              spirityRuneImage={build.perfectSpirityRune.itemImage}
              spirityRuneName={build.perfectSpirityRune.name}
            />
          </span>
        ))}
      </BuildScrollableList>
      <UserEditHerBuild>
        <Icon type="edit" />
      </UserEditHerBuild>
    </BuildsListArea>
  );
}
