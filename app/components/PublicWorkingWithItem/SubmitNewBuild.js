import React, { useState } from "react";
import { Select, Button, Radio, notification } from "antd";
import { getAllItensForCard } from "../../graphQL/queries";
import { CreateNewBuild } from "../../graphQL/mutations";
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";

const { Option } = Select;

const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message
  });
};

const SetBuildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  span {
    .ant-btn {
      width: -webkit-fill-available !important;
      margin: 30px auto 10px auto !important;
    }
  }
`;

const RarityGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const SelectedItensImages = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 15px;
  div {
    position: relative;
    min-height: 140px;
    min-width: 140px;
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

export default function SubmitNewBuild(props) {
  const [NewBuildInput, setNewBuildInput] = useState({
    relatedItemId: props.selectedItem.internalId,
    rarity: "",
    isPerfect: false,
    perfectRuneId: "",
    perfectSpirityRuneId: ""
  });

  const MutateCreateNewBuild = useMutation(CreateNewBuild);
  const itemList = useQuery(getAllItensForCard);

  function HandleSubmitNewBuild() {
    // Mutation
    MutateCreateNewBuild({
      variables: {
        input: NewBuildInput
      }
    })
      .then(() => {
        // Close Modal
        props.setModalSubmitNewBuild(false);
        // Update List on Screen
        props.itemFetchControler.refetch();
        // Open Notification
        openNotificationWithIcon(
          "success",
          "Build Created",
          "Everything works fine."
        );
      })
      .catch(() => {
        openNotificationWithIcon(
          "error",
          "Something Went Wrong",
          "Try again later."
        );
      });
  }

  if (itemList.loading) {
    return "Loading...";
  }

  return (
    <SetBuildWrapper>
      <BuildForItem>
        Build related to <h3>{props.selectedItem.name}</h3>
      </BuildForItem>
      <RarityGroup>
        <Radio.Group
          onChange={e => {
            setNewBuildInput({ ...NewBuildInput, rarity: e.target.value });
          }}
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
          {NewBuildInput.perfectRuneId && (
            <img
              src={
                itemList.data.getAllItens.find(item => {
                  return item.internalId == NewBuildInput.perfectRuneId;
                }).itemImage
              }
            />
          )}
        </div>
        <div>
          {NewBuildInput.perfectSpirityRuneId && (
            <img
              src={
                itemList.data.getAllItens.find(item => {
                  return item.internalId == NewBuildInput.perfectSpirityRuneId;
                }).itemImage
              }
            />
          )}
        </div>
      </SelectedItensImages>
      <SelectInputs>
        <Select
          showSearch
          placeholder="Your Item Rune"
          onChange={e =>
            setNewBuildInput({ ...NewBuildInput, perfectRuneId: e })
          }
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
          onChange={e =>
            setNewBuildInput({ ...NewBuildInput, perfectSpirityRuneId: e })
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
      <span onClick={HandleSubmitNewBuild}>
        <Button type="primary" size={"large"} block>
          Create New Build
        </Button>
      </span>
    </SetBuildWrapper>
  );
}
