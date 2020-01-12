import React from "react";
import { Select } from "antd";
import { getAllItensForCard } from "../../graphQL/queries";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";

const { Option } = Select;

const SetBuildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const SelectInputs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-select {
    margin: 0 15px;
    flex: 1;
  }
  .ant-select-selection {
    background-color: #32375a;
    border: 1px solid #292c48;
  }
  .ant-select-dropdown-menu-item {
    color: #fff;
  }
  .ant-select-selection-selected-value {
    color: #fff !important;
  }
  .ant-select-search--inline .ant-select-search__field {
    color: #fff !important;
  }
`;

const SelectedItensImages = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 15px;
  div {
    position: relative;
    :after {
      content: "";
      width: 110px;
      height: 110px;
      border-radius: 100%;
      background: #3d4171;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      z-index: 1;
    }
    img {
      width: 140px;
      position: relative;
      z-index: 2;
    }
  }
`;

export default function SetUserBuildComponent(props) {
  const itemList = useQuery(getAllItensForCard);

  if (itemList.loading) {
    return "Loading...";
  }

  return (
    <SetBuildWrapper>
      <SelectedItensImages>
        <div>
          {props.UserBuild.runeId && (
            <img
              src={`https://playshoptitans.com/${
                itemList.data.getAllItens.find(
                  item => item.internalId === props.UserBuild.runeId
                ).itemImage
              }`}
            />
          )}
        </div>
        <div>
          {props.UserBuild.spirityRuneId && (
            <img
              src={`https://playshoptitans.com/${
                itemList.data.getAllItens.find(
                  item => item.internalId === props.UserBuild.spirityRuneId
                ).itemImage
              }`}
            />
          )}
        </div>
      </SelectedItensImages>
      <SelectInputs>
        <Select
          showSearch
          defaultValue={props.UserBuild.runeId && props.UserBuild.runeId}
          onChange={e => props.setUserBuild({ ...props.UserBuild, runeId: e })}
          placeholder="Your Item Rune"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {itemList.data.getAllItens
            .filter(item => {
              return item.category.subCategory == "rune";
            })
            .map((rune, key) => (
              <Option key={key} value={rune.internalId}>
                {rune.name}
              </Option>
            ))}
        </Select>
        <Select
          showSearch
          defaultValue={props.UserBuild.spirityRuneId}
          onChange={e =>
            props.setUserBuild({ ...props.UserBuild, spirityRuneId: e })
          }
          placeholder="Your Spirity Rune"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {itemList.data.getAllItens
            .filter(item => {
              return item.category.subCategory == "rune";
            })
            .map((rune, key) => (
              <Option key={key} value={rune.internalId}>
                {rune.name}
              </Option>
            ))}
        </Select>
      </SelectInputs>
    </SetBuildWrapper>
  );
}
