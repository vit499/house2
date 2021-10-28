import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Context } from "..";
import Pur from "../components/Pur";
import { PURLIST_ROUTE } from "../utils/const";

const EditPurPage = observer(() => {
  const { onePurStore, purStore } = useContext(Context);
  const history = useHistory();
  const [isSubmitSave, setIsSubmitSave] = useState(false);
  const [isSubmitDel, setIsSubmitDel] = useState(false);

  const handleSubmit = () => {
    // e.preventDefault();
    console.log("save pur");
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
    setIsSubmitSave(true);
  };
  const handleCancel = (e) => {
    // console.log("add cancel");
    purStore.setNeedReq(false);
    history.push(PURLIST_ROUTE);
  };
  const handleDelete = () => {
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
      <Pur
        showDel={true}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    </div>
  );
});

export default EditPurPage;
