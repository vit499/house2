import React, { useContext, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../..";

const CreateTag = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const { markStore } = useContext(Context);

  const addClick = (e) => {
    e.preventDefault();
    const valCopy = value;
    setValue("");
    markStore.createTag({ name: valCopy });
  };
  const deleteOne = (id) => {
    markStore.delTag(id);
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
        <Modal.Title id="contained-modal-title-vcenter">Create tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="" onSubmit={addClick}>
          {markStore.tags &&
            markStore.tags.map((tag) => (
              <div key={tag.id} className="mb-1">
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>
                    {tag.name}
                  </Form.Label>
                  <Col sm={4}>
                    <Button
                      variant="outline-secondary"
                      onClick={() => deleteOne(tag.id)}
                    >
                      Del
                    </Button>
                  </Col>
                </Form.Group>
              </div>
            ))}

          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-3"
            placeholder="tag"
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

export default CreateTag;
