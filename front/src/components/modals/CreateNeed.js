import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createNeed } from "../../http/purchaseApi";

const CreateNeed = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const [act, setAct] = useState(false);

  const addClick = () => {
    if (!act) return;
    const valCopy = value;
    setValue("");
    setAct(false);
    createNeed({ name: valCopy }).then((data) => {
      onHide();
    });
  };
  const checkAct = (e) => {
    const v = e.target.value;
    setValue(v);
    if (v !== "") setAct(true);
    else setAct(false);
  };
  const submit = (e) => {
    e.preventDefault();
    addClick();
  };

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
          Create need
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="" onSubmit={submit}>
          <Form.Control
            value={value}
            onChange={checkAct}
            className="mt-3"
            placeholder="need"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => addClick()}
          disabled={!act}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNeed;
