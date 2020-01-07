import React from "react";
import ItensPageHeader from "./ItensPageHeader";
import ListItens from "./ListItens";
import { useQuery } from "react-apollo-hooks";
import { getAllItens } from "../../graphQL/queries";
import { Skeleton } from "antd";

export default function index() {
  // graphql Querie
  const fetchItens = useQuery(getAllItens);

  function checkForErrosOnContent() {
    if (fetchItens.error) {
      // Exibe pagina de erro
      return (
        <div>
          <ItensPageHeader loading={fetchItens.loading} error={fetchItens.error} />
        </div>
      );
    } else {
      // Exibe pagina de sucesso
      return (
        <div>
          <ItensPageHeader loading={fetchItens.loading} />
          {fetchItens.loading ? (
            <Skeleton avatar paragraph={{ rows: 10 }} active />
          ) : (
            <ListItens data={fetchItens.data} />
          )}
        </div>
      );
    }
  }
  return checkForErrosOnContent();
}
