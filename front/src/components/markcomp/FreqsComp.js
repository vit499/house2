import React from "react";
import { observer } from "mobx-react-lite";
import Checkbox from "antd/lib/checkbox/Checkbox";
import markStore from "../../store/MarkStore";

const FreqsComp = observer(({ handle }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginRight: "0.5rem",
      }}
    >
      <p style={{ textAlign: "center" }}>Частота</p>
      {markStore.freqs.map((t) => (
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

export default FreqsComp;
