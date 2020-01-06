import React from "react";
import styled from "styled-components";

const InfoPanelArea = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  h6{
    font-weight: 100;
    font-size: 14px;
    line-height: 0;
    margin: 0;
    margin-left: 10px;
  }
`;

const ImageIconArea = styled.div`
  background: #5d3086;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 25px;
  }
`

export default function MenuInfoPanel() {
  return (
    <InfoPanelArea>
      <InfoItem>
        <ImageIconArea>
          <img src="https://playshoptitans.com/images/assets/ui/itemtypes/icon_weapon_sword.png" />
        </ImageIconArea>
        <h6>365 Itens</h6>
      </InfoItem>
      <InfoItem>
        <ImageIconArea>
          <img src="https://playshoptitans.com/images/assets/ui/currency_gold.png" />
        </ImageIconArea>
        <h6>3000 Prices</h6>
      </InfoItem>
      <InfoItem>
        <ImageIconArea>
          <img src="https://playshoptitans.com/images/assets/items/ironspear.png" />
        </ImageIconArea>
        <h6>2650 Builds</h6>
      </InfoItem>
    </InfoPanelArea>
  );
}
