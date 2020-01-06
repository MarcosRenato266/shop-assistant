import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "antd";

import { fakeItens } from "../../data/itens";

const ItensListArea = styled.div``;

const CategoryArea = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: scroll;
  }
`;

const CategoryItemFilter = styled.div`
  padding: 5px 20px;
  background: #e2e2e2;
  border-radius: 5px;
  margin-right: 10px;
  img {
    width: 35px;
    pointer-events: none;
  }
  &.active {
    background: #5c3085 !important;
  }
  :hover {
    background: #5c3085;
  }
`;

const ListArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 15px;
`;

const ListItem = styled.div`
  width: 23%;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  min-height: 200px;
  position: relative;
  margin-bottom: 30px;
`;

const ItemHeader = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 9px;
  font-weight: 100;
`;

const ItemName = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h3 {
    margin: 0;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #9f9f9f !important;
  }
  h1 {
    margin: 0;
    line-height: 19px;
    font-size: 19px;
    font-weight: 600 !important;
    text-align: center;
  }
`;

const ItemImage = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  :before {
    content: "";
    width: 60px;
    height: 60px;
    border-radius: 100%;
    position: absolute;
    margin: 0 auto;
    z-index: 0;
    background: #e2e2e2;
  }
  img {
    z-index: 2;
    width: 80px;
  }
`;

const ItemEditButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: none;
  background: #5c3085;
  position: absolute;
  right: -6px;
  top: -6px;
  color: #fff;
`;

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

const groupByCategory = groupBy("category");

export default function ListItens() {
  const [ItensList, setItensList] = useState(fakeItens);
  const [ActiveFilter, setActiveFilter] = useState("all");

  return (
    <ItensListArea>
      <CategoryArea>
        {/* <div>
          <span onClick={() => setActiveFilter("all")}>
            <CategoryItemFilter className={ActiveFilter === "all" && "active"}>
              <img src="https://playshoptitans.com/images/assets/ui/filtertypes/icon_all.png" />
            </CategoryItemFilter>
          </span>
          {Object.keys(groupByCategory(fakeItens)).map((category, key) => (
            <span onClick={() => setActiveFilter(category)} key={key}>
              <CategoryItemFilter>
                <img src={`https://playshoptitans.com${category}`} />
              </CategoryItemFilter>
            </span>
          ))}
        </div> */}
      </CategoryArea>
      <ListArea>
        {ItensList.map(item => (
          <ListItem>
            <ItemEditButton>
              <Icon type="edit" />
            </ItemEditButton>
            <ItemHeader>
              <div>
                <b>Id</b> {item.internalId}
              </div>
            </ItemHeader>
            <ItemName>
              <h3>
                {item.category
                  .split(".")[0]
                  .split("_")
                  .pop()} - T{item.tier}
              </h3>
              <h1>{item.name}</h1>
            </ItemName>
            <ItemImage>
              <img src={`https://playshoptitans.com${item.itemImage}`} />
            </ItemImage>
          </ListItem>
        ))}
      </ListArea>
    </ItensListArea>
  );
}
