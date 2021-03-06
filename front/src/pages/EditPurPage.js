import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { PURLIST_ROUTE } from "../utils/const";
import purStore from "../store/PurStore";
import onePurStore from "../store/OnePurStore";
import PurchaseComp from "../components/purchase/PurchaseComp";

const EditPurPage = observer(() => {
  const history = useHistory();
  const [isSubmitSave, setIsSubmitSave] = useState(false);
  const [isSubmitDel, setIsSubmitDel] = useState(false);

  const handleSubmit = () => {
    // e.preventDefault();
    // console.log("save pur");
    // const p = {
    //   id: onePurStore.id,
    //   name: onePurStore.name,
    //   price: onePurStore.price,
    //   tags: onePurStore.tags,
    //   needId: onePurStore.needId,
    //   freqId: onePurStore.freqId,
    // };
    // console.log("submit edit pur", JSON.stringify(p, null, 2));
    if (onePurStore.name === "" || onePurStore.price === "") return;
    purStore.setNeedReq(true);
    setIsSubmitSave(true);
  };
  const handleCancel = (e) => {
    // console.log("add cancel");
    // purStore.setNeedReq(false);
    history.push(PURLIST_ROUTE);
  };
  const handleDelete = () => {
    purStore.setNeedReq(true);
    setIsSubmitDel(true);
  };

  useEffect(() => {
    if (!isSubmitSave) return;
    // console.log("save");
    onePurStore.updatePur();
  }, [isSubmitSave]);
  useEffect(() => {
    if (!isSubmitDel) return;
    // console.log("del");
    onePurStore.deletePur();
  }, [isSubmitDel]);

  if (onePurStore.load === "done") {
    return <Redirect to={PURLIST_ROUTE} />;
  }

  return (
    <div>
      <PurchaseComp
        showDel={true}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    </div>
  );
});

export default EditPurPage;
