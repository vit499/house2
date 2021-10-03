import React from "react";
import { Spinner } from "react-bootstrap";

const Load = () => {
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
  };

  return (
    <div style={wrapperStyle}>
      <Spinner animation="border" variant="primary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Load;
