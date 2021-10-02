import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createFreq } from "../../http/purchaseApi";

const CreateFreq = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  const addClick = (e) => {
    e.preventDefault();
    const valCopy = value;
    setValue("");
    createFreq({ name: valCopy }).then((data) => {
      onHide();
    });
  };

  // useEffect(() => {
  //   console.log("aaa");
  //   const listener = (event) => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       console.log("Enter key was pressed. Run your function.");
  //       event.preventDefault();
  //       addClick();
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     console.log("xxx");
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create freq
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="" onSubmit={addClick}>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-3"
            placeholder="freq"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-primary" onClick={(e) => addClick(e)}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateFreq;
