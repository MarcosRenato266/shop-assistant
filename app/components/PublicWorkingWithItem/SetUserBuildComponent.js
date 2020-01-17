import React from "react";
import { Select, Button, Radio, notification } from "antd";
import { getAllItensForCard } from "../../graphQL/queries";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";

const { Option } = Select;

const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message
  });
};

const RarityGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  .ant-radio-button-wrapper {
    color: rgb(110, 113, 148) !important;
    background: #32375a !important;
    border: 1px solid #2a2d4c !important;
  }
  .ant-radio-button-wrapper:not(:first-child)::before {
    background-color: transparent !important;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child {
    background: #febb12 !important;
    color: #fff !important;
    border-color: #febb12 !important;
    box-shadow: -1px 0 0 0 transparent !important;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):nth-child(2) {
    background: #c412fe !important;
    color: #fff !important;
    border-color: #c412fe !important;
    box-shadow: -1px 0 0 0 transparent !important;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):nth-child(3) {
    background: #12bdfe !important;
    color: #fff !important;
    border-color: #12bdfe !important;
    box-shadow: -1px 0 0 0 transparent !important;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):nth-child(4) {
    background: #2bfe12 !important;
    color: #fff !important;
    border-color: #2bfe12 !important;
    box-shadow: -1px 0 0 0 transparent !important;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):nth-child(5) {
    background: #464f92 !important;
    color: #fff !important;
    border-color: #464f92 !important;
    box-shadow: -1px 0 0 0 transparent !important;
  }
`;

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

const BuildForItem = styled.div`
  letter-spacing: 2px;
  font-weight: 100;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #525794;
  margin-bottom: 12px;
  h3 {
    color: #fff !important;
    font-weight: 400 !important;
    font-size: 23px;
  }
`;

export default function SetUserBuildComponent(props) {
  const itemList = useQuery(getAllItensForCard);

  if (itemList.loading) {
    return "Loading...";
  }

  return (
    <SetBuildWrapper>
      <BuildForItem>
        Setup your item <h3>rarity, rune and spirity</h3>
      </BuildForItem>
      <RarityGroup>
        <Radio.Group
          onChange={e =>
            props.setUserBuild({ ...props.UserBuild, rarity: e.target.value })
          }
        >
          <Radio.Button value="legendary">Legendary</Radio.Button>
          <Radio.Button value="epic">Epic</Radio.Button>
          <Radio.Button value="magistral">Magistral</Radio.Button>
          <Radio.Button value="superior">Superior</Radio.Button>
          <Radio.Button value="common">Common</Radio.Button>
        </Radio.Group>
      </RarityGroup>
      <SelectedItensImages>
        <div>
          {props.UserBuild.runeId && (
            <img
              src={`${
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
              src={`${
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
