import React, { useState } from "react";
import styled from "styled-components";
import ActionArea from "./ActionArea";
import ItemInformation from "./ItemInformation";
import ItemPriceBasedOnBuild from "./ItemPriceBasedOnBuild";
import BuildListMenu from "./BuildListMenu";
import ItemWorksForHeroes from "./ItemWorksForHeroes";

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
`;

export default function MainLayout(props) {
  const [SelectedBuild, setSelectedBuild] = useState(
    returnMostImportantBuildId()
  );

  function returnMostImportantBuildId() {
    const ImportantBuild = props.selectedItem.perfectBuild.find(build => {
      return build.isPerfect === true && build.rarity === "Legendary";
    });
    return ImportantBuild ? ImportantBuild.id : "";
  }
  console.log(SelectedBuild);
  return (
    <>
      <CentralAreaWrapper>
        {/* Action Area */}
        <ActionArea selectedItem={props.selectedItem} />
        {/* Working With Item Area */}
        <CentralAreaItemInformation>
          {/* Item image and info */}
          <ItemInformation selectedItem={props.selectedItem} />
          {/* Item Prices */}
          <ItemPriceBasedOnBuild
            buildList={props.selectedItem.perfectBuild}
            SelectedBuild={SelectedBuild}
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
      />
    </>
  );
}
