import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import Checkbox from "antd/lib/checkbox/Checkbox";

const NeedsComp = observer(({ handle }) => {
  const { markStore } = useContext(Context);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginRight: "0.5rem",
      }}
    >
      <p style={{ textAlign: "center" }}>Необх.</p>
      {markStore.needs.map((t) => (
        <div key={t.id}>
          <Checkbox
            value={t.id}
            style={{ lineHeight: "32px" }}
            checked={t.checked}
            onChange={handle}
          >
            {t.name}
          </Checkbox>
        </div>
      ))}
    </div>
  );
});

export default NeedsComp;
