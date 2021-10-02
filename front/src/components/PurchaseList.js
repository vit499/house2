import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "..";
import PurchaseItem from "./PurchaseItem";

const PurchaseList = observer(() => {
  const { purchase } = useContext(Context);

  console.log("p", purchase.purchases);
  return (
    <>
      {purchase.purchases &&
        purchase.purchases.map((p) => <PurchaseItem key={p.id} p={p} />)}
    </>
  );
});

export default PurchaseList;
