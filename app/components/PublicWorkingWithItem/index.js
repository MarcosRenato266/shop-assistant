import React, { useEffect } from "react";
import styled from "styled-components";
import { Icon } from "antd";
import MainLayout from "./MainLayout";

import { getItemById } from "../../graphQL/queries";
import { useQuery } from "react-apollo-hooks";

const WorkingWithItemArea = styled.div`
  width: 75%;
  display: flex;
`;

export default function index(props) {
  // All itens Querie
  const itemList = useQuery(getItemById, {
    variables: { itemId: props.item }
  });

  return (
    <WorkingWithItemArea>
      {itemList.loading || props.item === "" ? (
        <Icon type="experiment" theme="twoTone" />
      ) : (
        <MainLayout selectedItem={itemList.data.itemById} />
      )}
    </WorkingWithItemArea>
  );
}
