import React from "react";
import MainDashboardTemplate from "../components/Common/MainDashboardTemplate";
import ItensPage from "../components/ItensPage";

export default function itens() {
  return (
    <MainDashboardTemplate currentPage="Itm">
      <ItensPage />
    </MainDashboardTemplate>
  );
}
