import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Context } from "../..";
import { createPurchase, fetchNeeds, fetchFreqs } from "../../http/purchaseApi";

const CreatePurchase = observer(({ show, onHide }) => {
  const { purchase } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(50);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchFreqs()
      .then((data) => purchase.setFreqs(data))
      .catch((e) => {});
    fetchNeeds()
      .then((data) => purchase.setNeeds(data))
      .catch((e) => {});
  }, [purchase]);
  // const changeInfo = (key, value, number) => {
  //   const newInfo = tags.map((item) => {
  //     if (item.number === number) {
  //       return { ...item, [key]: value };
  //     } else return item;
  //   });
  //   setInfo(newInfo);
  // };

  const addClick = async () => {
    if (name === "") return;
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", `${price}`);
      formData.append("freqId", purchase.selectedFreqId);
      formData.append("needId", purchase.selectedNeedId);
      // formData.append("tags", JSON.stringify(tags));

      const data = await createPurchase(formData);
    } catch (err) {}
    onHide();
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
          Create purchase
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="">
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="purchase"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="цена"
            f="number"
          />
          {/* {tags.map((tag) => (
            <Form.Control placeholder="tag" value={tag.name} />
          ))} */}
          <Dropdown className="mt-2">
            <Dropdown.Toggle id="dropdown-basic">
              {"Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {purchase.freqs &&
                purchase.freqs.map((a) => (
                  <DropdownItem
                    onClick={() => purchase.setSelectedFreq(a)}
                    key={a.id}
                  >
                    {a.name}
                  </DropdownItem>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2">
            <Dropdown.Toggle id="dropdown-basic">
              {"Выберите бренд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {purchase.needs &&
                purchase.needs.map((a) => (
                  <DropdownItem
                    onClick={() => purchase.setSelectedNeed(a)}
                    key={a.id}
                  >
                    {a.name}
                  </DropdownItem>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-primary" onClick={() => addClick()}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreatePurchase;
