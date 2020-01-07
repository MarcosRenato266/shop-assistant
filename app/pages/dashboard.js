import React from "react";
import styled from "styled-components";
import MainDashboardTemplate from "../components/Common/MainDashboardTemplate";
import WithTokenProtection from '../libs/with-token-protection';

function dashboard() {
  return <MainDashboardTemplate currentPage="Dsh">
    Dashboard
  </MainDashboardTemplate>;
}

export default dashboard;
// export default WithTokenProtection(dashboard);