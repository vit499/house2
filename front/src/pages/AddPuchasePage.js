import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Context } from "..";
import Purchase from "../components/Purchase";
import { HOME_ROUTE } from "../utils/const";

const AddPuchasePage = () => {
  const { purchaseStore } = useContext(Context);
  const history = useHistory();

  const handleSubmit = (e, p) => {
    e.preventDefault();
    console.log("sub new pur", p);
  };
  const handleCancel = (e) => {
    console.log("add cancel");
    purchaseStore.setReqPurchase(false);
    history.push({
      pathname: HOME_ROUTE,
      // state: { canceled: true },
    });
  };
  return (
    <div>
      <Purchase
        showDel={false}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default AddPuchasePage;
