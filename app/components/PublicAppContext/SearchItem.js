import React from "react";
import styled from "styled-components";
import { Input, Select } from "antd";
const { Option } = Select;
import { getAllCategories } from "../../graphQL/queries";
import { useQuery } from "react-apollo-hooks";

const SearchItem = styled.div`
  background: #2d325a;
  padding: 15px;
  .ant-input {
    background: transparent;
    border: none;
    border-left: 1px solid #7580bd;
    color: #fff;
    width: -webkit-fill-available;
    :focus {
      box-shadow: none;
    }
    ::placeholder {
      color: #505bad;
    }
  }
  .ant-input-group-addon {
    background: #202542;
    border: none;
  }
  .ant-select-selection-selected-value {
    color: #7580bd;
    margin-right: 5px;
  }
  .ant-select-arrow {
    color: #7580bd;
  }
`;

export default function SearchItemComponent(props) {
  const fetchCategories = useQuery(getAllCategories);

  const selectCategory = (
    <Select defaultValue="all" onChange={e => props.setInputCategory(e)}>
      <Option value="all">
        <img
          className="cIcon"
          src="https://playshoptitans.com/images/assets/ui/filtertypes/icon_all.png"
        />
      </Option>
      {fetchCategories.data.allCategories &&
        fetchCategories.data.allCategories.map(category => (
          <Option value={category.subCategory} key={category.id}>
            <img
              className="cIcon"
              src={`https://playshoptitans.com${category.categoryImage}`}
            />
          </Option>
        ))}
    </Select>
  );

  return (
    <SearchItem>
      <Input
        addonAfter={selectCategory}
        placeholder="Search Item..."
        onChange={e => props.setInputSearch(e.target.value)}
      />
    </SearchItem>
  );
}
