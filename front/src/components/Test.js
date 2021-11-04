import { AutoComplete, Col, Row } from "antd";
import React, { useContext, useState } from "react";
import { Context } from "..";

const Test = () => {
  const { purStore } = useContext(Context);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    const r = purStore.filterHint(searchText);
    setOptions(!searchText ? [] : r);
  };

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  return (
    <div>
      <Row>
        <Col span={8} offset={8}>
          <AutoComplete
            value={value}
            options={options}
            style={{
              width: 200,
            }}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
            placeholder="control mode"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Test;
