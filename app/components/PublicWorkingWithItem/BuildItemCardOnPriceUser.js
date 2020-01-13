import React from "react";
import styled from "styled-components";

import { getUserBuildItemsById } from "../../graphQL/queries";
import { useQuery } from "react-apollo-hooks";

const RunesCombineDivider = styled.div`
  font-size: 50px;
  font-weight: bold;
  color: #2e3463;
`;

const RunesCombine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex: 1;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 40px;
    }
    span {
      font-size: 10px;
      text-align: center;
      color: #fff;
      overflow-wrap: break-word;
    }
  }
`;

const BuildItem = styled.div`
  border-bottom: 1px solid #2c325a;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-bottom: 15px;
  border-left: 2px solid transparent;
  transition: all 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
`;

export default function BuildItemCardOnCardUser(props) {
  const runeInfo = useQuery(getUserBuildItemsById, {
    variables: {
      itemId: props.userBuildData.runeId
    }
  });
  const spirityRuneInfo = useQuery(getUserBuildItemsById, {
    variables: {
      itemId: props.userBuildData.spirityRuneId
    }
  });

  if (runeInfo.loading || spirityRuneInfo.loading) {
    return <div>Loading...</div>;
  }

  return (
    <BuildItem>
      <RunesCombine>
        <div>
          <img
            src={`${runeInfo.data.itemById.itemImage}`}
          />
          <span>{runeInfo.data.itemById.name}</span>
        </div>
        <RunesCombineDivider>+</RunesCombineDivider>
        <div>
          <img
            src={`${spirityRuneInfo.data.itemById.itemImage}`}
          />
          <span>{spirityRuneInfo.data.itemById.name}</span>
        </div>
      </RunesCombine>
    </BuildItem>
  );
}
