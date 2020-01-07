import React from "react";
import styled from "styled-components";
import MainDashboardTemplate from "../components/Common/MainDashboardTemplate";
import WithTokenProtection from '../libs/with-token-protection';

function prices() {
  return (
    <MainDashboardTemplate currentPage="Prc">
      gerenciar Precos
    </MainDashboardTemplate>
  );
}

export default prices;
// export default WithTokenProtection(prices);