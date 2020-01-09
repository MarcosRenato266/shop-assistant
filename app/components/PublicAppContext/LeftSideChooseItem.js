import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import SearchItem from "./SearchItem";
import ItemList from "./ItemList";
import { Skeleton } from "antd";

import { getAllItensForCard } from "../../graphQL/queries";
import { useQuery } from "react-apollo-hooks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: inherit;
`;

const ItemListWrapper = styled.div`
  padding: 15px;
  height: 80vh;
  overflow-y: scroll;
  .ant-skeleton.ant-skeleton-active .ant-skeleton-content .ant-skeleton-title,
  .ant-skeleton.ant-skeleton-active
    .ant-skeleton-content
    .ant-skeleton-paragraph
    > li {
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(25%, #252a4a),
      color-stop(37%, #202442),
      color-stop(63%, #252a4a)
    );
    background: linear-gradient(90deg, #252a4a 25%, #202442 37%, #252a4a 63%);
    background-size: 400% 100%;
    -webkit-animation: ant-skeleton-loading 1.4s ease infinite;
    animation: ant-skeleton-loading 1.4s ease infinite;
  }
`;

export default function LeftSideChooseItem(props) {
  // All itens Querie
  const itemList = useQuery(getAllItensForCard);
  // Filter Input State
  const [InputSearch, setInputSearch] = useState("");
  const [InputCategory, setInputCategory] = useState("all");

  function filteredList() {
    if (InputSearch === "" && InputCategory === "all") {
      return itemList.data.getAllItens;
    } else {
      return InputCategory === "all"
        ? itemList.data.getAllItens.filter(item => {
            return item.name.toLowerCase().includes(InputSearch.toLowerCase());
          })
        : itemList.data.getAllItens
            .filter(item => {
              return (
                item.category.subCategory.toLowerCase() ===
                InputCategory.toLowerCase()
              );
            })
            .filter(item => {
              return item.name
                .toLowerCase()
                .includes(InputSearch.toLowerCase());
            });
    }
  }
  return (
    <Wrapper>
      <Header />
      <SearchItem
        setInputSearch={setInputSearch}
        setInputCategory={setInputCategory}
      />
      <ItemListWrapper>
        {itemList.loading ? (
          <Skeleton paragraph={{ rows: 10 }} active />
        ) : (
          <ItemList
            itemList={filteredList()}
            InputSearch={InputSearch}
            InputCategory={InputCategory}
            setSelectedItem={props.setSelectedItem}
          />
        )}
      </ItemListWrapper>
    </Wrapper>
  );
}
