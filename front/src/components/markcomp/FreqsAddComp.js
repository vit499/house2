import React from "react";
import { observer } from "mobx-react-lite";
import Checkbox from "antd/lib/checkbox/Checkbox";
import markStore from "../../store/MarkStore";
import onePurStore from "../../store/OnePurStore";

const FreqsAddComp = observer(() => {
  const handle = (id) => {
    onePurStore.setFreqId(id);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginRight: "0.5rem",
      }}
    >
      {markStore.freqs.map((t) => (
        <div key={t.id}>
          <Checkbox
            value={t.id}
            style={{ lineHeight: "32px", marginLeft: ".5rem" }}
            checked={t.id === onePurStore.freqId}
            onChange={() => handle(t.id)}
          >
            {t.name}
          </Checkbox>
        </div>
      ))}
    </div>
  );
});

export default FreqsAddComp;
