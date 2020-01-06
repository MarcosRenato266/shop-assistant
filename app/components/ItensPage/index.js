import React from 'react';
import styled from "styled-components";
import ItensPageHeader from "./ItensPageHeader";
import ListItens from "./ListItens";

export default function index() {
  return (
    <div>
      <ItensPageHeader />
      <ListItens />
    </div>
  )
}
