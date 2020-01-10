import React from "react";
import styled from "styled-components";
import HeroeItemCard from "./HeroeItemCard";

const ItemWorksForHeroesWrapper = styled.div`
  background: transparent;
`;

const TitleSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  font-size: 14px;
  font-weight: 100;
  color: #fff;
  margin-bottom: 15px;
`;

const HeroeItemList = styled.div`
  padding: 15px;
`;

export default function ItemWorksForHeroes(props) {
  return (
    <ItemWorksForHeroesWrapper>
      <TitleSection>Heroes That Can Use</TitleSection>
      <HeroeItemList>
        {props.selectedItem.heroesThatCanUse.map(heroe => (
          <HeroeItemCard
            class={heroe.className}
            subClass={heroe.subClass}
            critChange={heroe.criticalChancePercent}
            critDamage={heroe.criticalDamageTimes}
            threatRat={heroe.threatRating}
            evaPercent={heroe.evaPercent}
            hp={heroe.hp}
            atk={heroe.atk}
            def={heroe.def}
            element={heroe.element}
          />
        ))}
      </HeroeItemList>
    </ItemWorksForHeroesWrapper>
  );
}
