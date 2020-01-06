import React from "react";
import MainDashboardTemplate from "../components/Common/MainDashboardTemplate";
import BuildPage from "../components/BuildPage";

export default function itens() {
  return (
    <MainDashboardTemplate currentPage="Bld">
      <BuildPage />
    </MainDashboardTemplate>
  );
}
