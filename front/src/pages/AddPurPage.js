import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Context } from "..";
import Pur from "../components/Pur";
import { HOME_ROUTE } from "../utils/const";

const AddPuchasePage = observer(() => {
  const { purchaseStore, purStore } = useContext(Context);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sub new pur");
    if (purStore.Pur.name === "" || purStore.Pur.price === "") return;
    purStore.createPur();
    history.push(HOME_ROUTE);
  };
  const handleCancel = (e) => {
    console.log("add cancel");
    purchaseStore.setReqPurchase(false);
    history.push(HOME_ROUTE);
  };

  useEffect(() => {
    purStore.initPur();
  }, [purStore]);
  return (
    <div>
      <Pur
        showDel={false}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </div>
  );
});

export default AddPuchasePage;
