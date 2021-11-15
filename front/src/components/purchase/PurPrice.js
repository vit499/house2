import { Input } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import onePurStore from "../../store/OnePurStore";

const PurPrice = observer(() => {
  const hChangePrice = (e) => {
    const n = e.target.value;
    const x = onePurStore.price.toString();
    if (n.length > x.length) {
      const a = n.substring(x.length);
      if (isNaN(a)) return;
    }
    let p = Number(n);
    if (isNaN(p)) p = 0;
    onePurStore.setPrice(p);
  };

  return (
    <div>
      <Input
        placeholder="Цена"
        value={onePurStore.price}
        onChange={hChangePrice}
        style={{
          width: "100%",
          marginBottom: "1rem",
        }}
      />
    </div>
  );
});

export default PurPrice;
