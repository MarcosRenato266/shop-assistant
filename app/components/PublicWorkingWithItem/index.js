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

const NoData = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #464e7d;
  margin-bottom: 20px;
`;

export default function index(props) {
  // All itens Querie
  const itemList = useQuery(getItemById, {
    variables: { itemId: props.item }
  });

  return (
    <WorkingWithItemArea>
      {itemList.loading || props.item === "" ? (
        <NoData>Please Select an Item on your left to continue</NoData>
      ) : (
        <MainLayout selectedItem={itemList.data.itemById} />
      )}
    </WorkingWithItemArea>
  );
}
