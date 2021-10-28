import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import Checkbox from "antd/lib/checkbox/Checkbox";

const NeedsAddComp = observer(() => {
  const { markStore, onePurStore } = useContext(Context);

  const handle = (id) => {
    onePurStore.setNeedId(id);
  };

  useEffect(() => {
    console.log(
      "effect pur, needId, freqId",
      onePurStore.needId,
      onePurStore.freqId
    );
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginRight: "2rem",
      }}
    >
      {markStore.needs.map((t) => (
        <div key={t.id}>
          <Checkbox
            value={t.id}
            style={{ lineHeight: "32px", marginLeft: ".5rem" }}
            checked={t.id === onePurStore.needId}
            onChange={() => handle(t.id)}
          >
            {t.name}
          </Checkbox>
        </div>
      ))}
    </div>
  );
});

export default NeedsAddComp;
