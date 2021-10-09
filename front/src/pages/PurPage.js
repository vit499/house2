import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "..";
import Load from "../components/Load";
import { HOME_ROUTE } from "../utils/const";
import { flowResult } from "mobx";
import Pur from "../components/Pur";
import Err from "../components/Err";

const PurPage = observer(() => {
  const { purchaseStore, purStore } = useContext(Context);
  // const [purchase, setPurchase] = useState(null);
  const { id } = useParams();
  const history = useHistory();
  console.log("id", id);

  const handleSubmit = (e) => {
    e.preventDefault();
    purStore.updatePur(id);
    history.push(HOME_ROUTE);
  };
  const handleCancel = () => {
    purchaseStore.setReqPurchase(false);
    history.push(HOME_ROUTE);
  };
  const handleDelete = () => {
    purStore.deletePur(id);
    history.push(HOME_ROUTE);
  };

  useEffect(() => {
    async function f() {
      const pur = await flowResult(purStore.fetchPur(id));
      console.log("pur page flow res", pur);
    }
    f();
    return function () {
      // console.log("pur cancel", pur);
      // pur.cancel();
    };
  }, [id, purStore]);

  useEffect(() => {
    console.log("useEffect pur page");
    if (purStore.Pur.name === "") return;
    console.log("done pur load");
  }, [purStore.Pur]);

  // console.log("p page", JSON.stringify(purchase, null, 2));

  if (purStore.load === "load") {
    return <Load />;
  }
  if (purStore.load === "err") {
    return <Err />;
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

export default PurPage;
