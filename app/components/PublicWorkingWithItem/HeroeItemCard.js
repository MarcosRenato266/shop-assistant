import React from "react";
import styled from "styled-components";
import { Icon } from "antd";

const HeroeItem = styled.div`
  background: #2a3052;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 20px;
`;

const ClassInfo = styled.div`
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
  div {
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 100;
    line-height: 12px;
    margin-right: 10px;
    span {
      font-size: 12px;
      letter-spacing: initial;
      font-weight: 400;
      text-transform: capitalize;
      display: block;
    }
  }
`;

const StatsInfo = styled.div`
  display: flex;
  color: #fff;
  flex-direction: column;
  margin-left: 10px;
  div {
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 100;
    line-height: 12px;
    margin-right: 10px;
    color: #565d94;
    span {
      font-size: 12px;
      letter-spacing: initial;
      font-weight: 400;
      text-transform: capitalize;
      margin-left: 5px;
      color: #fff;
    }
  }
`;

const HeroeItemClass = styled.div`
  background: ${props => props.HeroeClass};
  height: 30px;
  width: 30px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 20px;
  }
`;

export default function HeroeItemCard(props) {
  function returnColorBasedOnHeroeClass(heroeClass) {
    switch (heroeClass) {
      case "fighter":
        return "#af2a29";
      case "rogue":
        return "#2daf2b";
      case "spellcaster":
        return "#2caf96";
      default:
        return "#fff";
    }
  }

  function returnItemBasedOnHeroeClass(heroeClass) {
    switch (heroeClass) {
      case "fighter":
        return "https://playshoptitans.com/images/assets/ui/itemtypes/icon_weapon_sword.png";
      case "rogue":
        return "https://playshoptitans.com/images/assets/ui/itemtypes/icon_weapon_dagger.png";
      case "spellcaster":
        return "https://playshoptitans.com/images/assets/ui/itemtypes/icon_weapon_staff.png";
      default:
        return "https://playshoptitans.com/images/assets/ui/itemtypes/icon_weapon_sword.png";
    }
  }
  return (
    <HeroeItem>
      <ClassInfo>
        <HeroeItemClass HeroeClass={returnColorBasedOnHeroeClass(props.class)}>
          <img src={returnItemBasedOnHeroeClass(props.class)} />
        </HeroeItemClass>
        <div>
          {props.class}
          <span>{props.subClass}</span>
        </div>
      </ClassInfo>
      <StatsInfo>
        <div>
          Crit. Chance
          <span>{props.critChange}%</span>
        </div>
        <div>
          Crit. Damage
          <span>{props.critDamage}x</span>
        </div>
        <div>
          Threat Rat.
          <span>{props.threatRat}</span>
        </div>
        <div>
          Eva. Percent
          <span>{props.evaPercent}%</span>
        </div>
      </StatsInfo>
      <StatsInfo>
        <div>
          HP
          <span>{props.hp}</span>
        </div>
        <div>
          ATK
          <span>{props.atk}</span>
        </div>
        <div>
          DEF
          <span>{props.def}</span>
        </div>
        <div>
          Element
          <span>{props.element}</span>
        </div>
      </StatsInfo>
    </HeroeItem>
  );
}
