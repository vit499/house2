import React from "react";
import Purchase from "../components/Purchase";

const AddPuchasePage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleCancel = (e) => {};
  return (
    <div>
      <Purchase
        showDel={false}
        handleSubmit={handleSubmit}
        handelCancel={handleCancel}
      />
    </div>
  );
};

export default AddPuchasePage;
