import React from "react";
import MainDashboardTemplate from "../components/Common/MainDashboardTemplate";
import BuildPage from "../components/BuildPage";
import WithTokenProtection from '../libs/with-token-protection';

function builds() {
  return (
    <MainDashboardTemplate currentPage="Bld">
      <BuildPage />
    </MainDashboardTemplate>
  );
}

export default builds;
// export default WithTokenProtection(builds);