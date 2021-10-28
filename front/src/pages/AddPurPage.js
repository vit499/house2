import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Context } from "..";
import Pur from "../components/Pur";
import { PURLIST_ROUTE } from "../utils/const";

const AddPurPage = observer(() => {
  const { markStore, onePurStore, purStore } = useContext(Context);
  const [isSubmitSave, setIsSubmitSave] = useState(false);
  const history = useHistory();

  const handleSubmit = () => {
    // e.preventDefault();
    //const p = {};
    //console.log("sub new pur", JSON.stringify(p, null, 2));
    if (onePurStore.name === "" || onePurStore.price === "") return;
    setIsSubmitSave(true);
  };
  const handleCancel = () => {
    purStore.setNeedReq(false);
    history.push(PURLIST_ROUTE);
  };
  const handleDelete = () => {};

  useEffect(() => {
    onePurStore.Init(markStore.tags);
  }, []);

  useEffect(() => {
    if (!isSubmitSave) return;
    // console.log("add pur");
    onePurStore.createPur();
  }, [isSubmitSave]);

  if (onePurStore.load === "done") {
    return <Redirect to={PURLIST_ROUTE} />;
  }
  return (
    <div>
      <Pur
        showDel={false}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    </div>
  );
});

export default AddPurPage;
