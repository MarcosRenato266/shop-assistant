import React from "react";
import MainDashboardTemplate from "../components/Common/MainDashboardTemplate";
import ItensPage from "../components/ItensPage";

import WithTokenProtection from "../libs/with-token-protection";

function itens() {
  
  // Everything works fine
  return (
    <MainDashboardTemplate currentPage="Itm">
      <ItensPage />
    </MainDashboardTemplate>
  );
}

// export default itens;
export default WithTokenProtection(itens);
