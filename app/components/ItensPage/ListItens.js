import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon, Input } from "antd";
let _ = require("lodash");

const { Search } = Input;

const ItensListArea = styled.div``;

const SearchArea = styled.div`
  padding: 15px;
  .ant-input {
    width: -webkit-fill-available !important;
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

export default function ListItens(props) {
  const [ItensList, setItensList] = useState(props.data.getAllItens);

  // useEffect(() => {
  //   setItensList(props.data.getAllItens);
  // }, [props.data]);

  function searchFilter(value) {
    if (value) {
      const FilteredList = _.filter(props.data.getAllItens, item => {
        return _.includes(item.name.toLowerCase(), value.toLowerCase());
      });
      setItensList(FilteredList);
    } else {
      setItensList(props.data.getAllItens);
    }
  }

  return (
    <ItensListArea>
      <SearchArea>
        <Search
          placeholder="Pesquisar Item por nome"
          onChange={value => searchFilter(value.target.value)}
        />
      </SearchArea>
      <ListArea>
        {ItensList.map((item, key) => (
          <ListItem key={key}>
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
                {item.category.subCategory}
                - T{item.tier}
              </h3>
              <h1>{item.name}</h1>
            </ItemName>
            <ItemImage>
              <img src={`${item.itemImage}`} />
            </ItemImage>
          </ListItem>
        ))}
      </ListArea>
    </ItensListArea>
  );
}
