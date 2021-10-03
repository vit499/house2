import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import PurchaseItem from "./PurchaseItem";

const PurchaseList = observer(() => {
  const { purchaseStore } = useContext(Context);

  // console.log("purchase", purchaseStore.purchases);
  return (
    <>
      {purchaseStore.purchases &&
        purchaseStore.purchases.map((purchase) => (
          <PurchaseItem key={purchase.id} purchase={purchase} />
        ))}
    </>
  );
});

export default PurchaseList;
