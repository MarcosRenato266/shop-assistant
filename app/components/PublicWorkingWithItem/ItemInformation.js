import React from "react";
import styled from "styled-components";

const ItemImageAndInfoImage = styled.div`
  padding: 15px;
  position: relative;
  :after {
    content: "";
    background: #2c3256;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    z-index: 0;
  }
  img {
    width: 150px;
    position: relative;
    z-index: 99;
  }
`;

const ItemImageAndInfoContent = styled.div`
  margin-left: 20px;
  h2 {
    color: #313567 !important;
    font-weight: 600 !important;
    letter-spacing: 1px !important;
    margin-top: 15px;
  }
  p {
    color: #fff;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 100;
    font-size: 10px;
    color: #8487b1;
    margin: 0;
    span {
      color: #fff;
      font-weight: 100;
      letter-spacing: 0;
      text-transform: capitalize;
      font-size: 14px;
      color: ${props => props.rarity};
    }
  }
`;

const ItemImageAndInfo = styled.div`
  display: flex;
  align-items: center;
`;

export default function ItemInformation(props) {
  return (
    <ItemImageAndInfo>
      <ItemImageAndInfoImage>
        <img
          src={`https://playshoptitans.com${props.selectedItem.itemImage}`}
        />
      </ItemImageAndInfoImage>
      <ItemImageAndInfoContent>
        <h2>Information</h2>
        <p>
          Item Name: <span>{props.selectedItem.name}</span>
        </p>
        <p>
          Item Tier: <span>{props.selectedItem.tier}</span>
        </p>
        <p>
          Category: <span>{props.selectedItem.category.categoryName}</span>
        </p>
        <p>
          Class: <span>{props.selectedItem.category.subCategory}</span>
        </p>
      </ItemImageAndInfoContent>
    </ItemImageAndInfo>
  );
}
