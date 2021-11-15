import { AutoComplete } from "antd";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import onePurStore from "../../store/OnePurStore";
import purStore from "../../store/PurStore";

const PurName = observer(() => {
  // const hChangeName = (e) => {
  //   const n = e.target.value;
  //   onePurStore.setName(n);
  // };

  // const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    const r = purStore.filterHint(searchText);
    setOptions(!searchText ? [] : r);
  };

  const onSelect = (data) => {
    // console.log("onSelect", data);
    onePurStore.setName(data);
    onePurStore.FindByName(data);
  };

  const onChange = (data) => {
    // setValue(data);
    onePurStore.setName(data);
  };
  return (
    <div>
      {/* <Input
        placeholder="Товар"
        value={onePurStore.name}
        onChange={hChangeName}
        style={{ marginBottom: "1rem" }}
      /> */}
      <AutoComplete
        value={onePurStore.name}
        options={options}
        // style={{
        //   width: 200,
        // }}
        style={{ width: "100%", marginBottom: "1rem" }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="хлеб"
        autoFocus={true}
      />
    </div>
  );
});

export default PurName;
