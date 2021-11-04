import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Pur from "../components/Pur";
import { PURLIST_ROUTE } from "../utils/const";
import markStore from "../store/MarkStore";
import purStore from "../store/PurStore";
import onePurStore from "../store/OnePurStore";

const AddPurPage = observer(() => {
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
    onePurStore.createPur().then(() => history.push(PURLIST_ROUTE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSave]);

  // if (onePurStore.load === "done") {
  //   return <Redirect to={PURLIST_ROUTE} />;
  // }
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
