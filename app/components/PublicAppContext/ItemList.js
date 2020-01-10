import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ItemContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
`;

const ItemTier = styled.div`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateX(-30%) translateY(10%);
  background: red;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #4d8a48;
  background: #3c7437;
  z-index: 0;
`;

const ItemImage = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  img {
    width: 80px;
    z-index: 1;
  }
  :before {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background: #3b406b;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`;

const ItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  margin-top: 20px;
  background: #4e7cff;
  padding: 4px 6px;
  border-radius: 4px;
  text-align: center;
`;

const ItemCategoryInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  div {
    color: #737aae;
    font-size: 10px;
    line-height: 13px;
    font-weight: 100;
    letter-spacing: 2px;
    text-transform: uppercase;
    span {
      color: #fff;
      font-size: 13px;
      display: block;
      letter-spacing: initial;
      text-transform: capitalize;
      font-weight: 400;
    }
  }
`;

const ItemElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2d325a;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  border-left: 2px solid transparent;
  position: relative;
  transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  :hover {
    cursor: pointer;
    border-left: 2px solid #2daf2b;
  }
  &.active {
    background: #2daf2b;
    ${ItemName} {
      background: #313456;
    }
    ${ItemCategoryInfo} {
      div{
        color: #313456;
      }
      img {
        background: #3a7d20;
        border-radius: 100%;
      }
    }
  }
`;

export default function ItemList(props) {
  const [SelectedItem, setSelectedItem] = useState("");

  function unCheckIfSelected(item) {
    SelectedItem === item &&
      (setSelectedItem(""), props.setSelectedItem(item.internalId));
  }

  return (
    <div>
      {props.itemList.map(item => {
        return (
          <ItemElement
            onClick={() => (
              props.setSelectedItem(item.internalId),
              setSelectedItem(item.internalId),
              unCheckIfSelected(item.internalId)
            )}
            className={SelectedItem === item.internalId ? "active" : undefined}
            key={item.internalId}
          >
            <ItemContent>
              <ItemCategoryInfo>
                <img
                  src={`https://playshoptitans.com${item.category.categoryImage}`}
                />
                <div>
                  {item.category.categoryName}
                  <span>{item.category.subCategory}</span>
                </div>
              </ItemCategoryInfo>
              <ItemName>{item.name}</ItemName>
            </ItemContent>
            <ItemImage>
              <img src={`https://playshoptitans.com${item.itemImage}`} />
              <ItemTier>{item.tier}</ItemTier>
            </ItemImage>
          </ItemElement>
        );
      })}
    </div>
  );
}
