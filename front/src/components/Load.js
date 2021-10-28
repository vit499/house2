import { SmileTwoTone } from "@ant-design/icons";
import React from "react";

const wrapperStyle = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  fontSize: "48px",
  margin: "6px",
};

const Load = () => {
  return (
    <div style={wrapperStyle}>
      <SmileTwoTone spin twoToneColor="#52c41a" />
      <SmileTwoTone spin twoToneColor="#eb2f96" />
      <SmileTwoTone spin twoToneColor="#52c41a" />
    </div>
  );
};

export default Load;
