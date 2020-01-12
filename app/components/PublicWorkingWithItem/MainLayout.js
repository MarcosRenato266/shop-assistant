import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ActionArea from "./ActionArea";
import ItemInformation from "./ItemInformation";
import ItemPriceBasedOnBuild from "./ItemPriceBasedOnBuild";
import BuildListMenu from "./BuildListMenu";
import ItemWorksForHeroes from "./ItemWorksForHeroes";
import { Icon } from "antd";

const CentralAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const CentralAreaItemInformation = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  padding-bottom: 70px;
`;

const ThisBuildPriceWorks = styled.div`
  height: 60px;
  border-radius: 40px;
  padding: 0 65px;
  font-size: 15px;
  background: #7033ff;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  i {
    font-size: 25px !important;
    margin-right: 9px;
  }
`;

export default function MainLayout(props) {
  const [SelectedBuild, setSelectedBuild] = useState(
    returnMostImportantBuildId()
  );
  const [UserBuild, setUserBuild] = useState({
    rarity: "",
    runeId: "Chipped_Runestone",
    spirityRuneId: "Chipped_Runestone"
  });

  useEffect(() => {
    setSelectedBuild(returnMostImportantBuildId());
  }, [props.selectedItem]);

  function returnMostImportantBuildId() {
    const ImportantBuild = props.selectedItem.perfectBuild.find(build => {
      return build.isPerfect === true && build.rarity === "Legendary";
    });
    return ImportantBuild ? ImportantBuild.id : "";
  }

  return (
    <>
      <CentralAreaWrapper>
        {/* Action Area */}
        <ActionArea selectedItem={props.selectedItem} />
        {/* Working With Item Area */}
        <CentralAreaItemInformation>
          {/* Item image and info */}
          <ItemInformation
            selectedItem={props.selectedItem}
            buildList={props.selectedItem.perfectBuild}
            SelectedBuild={SelectedBuild}
          />
          {/* Item Prices */}
          <ItemPriceBasedOnBuild
            buildList={props.selectedItem.perfectBuild}
            SelectedBuild={SelectedBuild}
            UserBuild={UserBuild}
          />
          {/* Item heroes that can use */}
          <ItemWorksForHeroes selectedItem={props.selectedItem} />
        </CentralAreaItemInformation>
      </CentralAreaWrapper>
      {/* Build side Menu */}
      <BuildListMenu
        selectedItem={props.selectedItem}
        SelectedBuild={SelectedBuild}
        setSelectedBuild={setSelectedBuild}
        UserBuild={UserBuild}
        setUserBuild={setUserBuild}
      />
      <ThisBuildPriceWorks>
        <Icon type="safety-certificate" theme="filled" />
        This Build Price Works For You?
      </ThisBuildPriceWorks>
    </>
  );
}
