import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { dropDb } from "../../http/userApi";

const DropDb = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const [act, setAct] = useState(false);

  const addClick = () => {
    if (value !== "drop") return;
    setValue("");
    dropDb().then((data) => {
      onHide();
    });
  };
  const checkAct = (e) => {
    const v = e.target.value;
    setValue(v);
    if (v === "drop") setAct(true);
    else setAct(false);
  };
  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Удалить всю базу данных? Type 'drop'
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="" onSubmit={submit}>
            <Form.Control
              value={value}
              onChange={checkAct}
              className="mt-3"
              placeholder="type"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>
            Close
          </Button>
          <Button
            variant={act ? "outline-danger" : "outline"}
            onClick={() => addClick()}
            disabled={!act}
          >
            Drop
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DropDb;
