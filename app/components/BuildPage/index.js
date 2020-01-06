import React from 'react';
import styled from "styled-components";
import BuildPageHeader from "./BuildPageHeader";
import ListBuild from "./ListBuild";

export default function index() {
  return (
    <div>
      <BuildPageHeader />
      <ListBuild />
    </div>
  )
}
