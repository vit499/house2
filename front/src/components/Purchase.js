import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Context } from "..";

const Purchase = ({ showDel, handleSubmit, handleCancel, handleDel }) => {
  const { markStore, purchaseStore } = useContext(Context);
  const [purchase, setPurchase] = useState({
    name: "",
    price: "",
    needId: 3,
    freqId: 1,
    tags: [],
  });

  const changeName = (e) => {
    const name = e.target.value;
    const p = { ...purchase, name };
    setPurchase(p);
  };
  const changePrice = (e) => {
    let n = Number(e.target.value);
    let price;
    // console.log("price", n);
    if (isNaN(n)) price = 0;
    else price = n;
    // console.log("price", price);
    const p = { ...purchase, price };
    setPurchase(p);
  };
  const changeTag = (e) => {
    const tag = e.target.value;
    let p;
    let tags;
    if (purchase.tags.includes(tag)) {
      tags = purchase.tags.filter((t) => t !== tag);
    } else {
      tags = [...purchase.tags, tag];
    }
    p = { ...purchase, tags };
    // console.log("p", JSON.stringify(p, null, 2));
    setPurchase(p);
  };
  const changeNeed = (e) => {
    const needId = Number(e.target.id);
    console.log("change need", needId);
    const p = { ...purchase, needId };
    console.log("p", JSON.stringify(p, null, 2));
    setPurchase(p);
  };
  const changeFreq = (e) => {
    const freqId = Number(e.target.id);
    console.log("change need", freqId);
    const p = { ...purchase, freqId };
    console.log("p", JSON.stringify(p, null, 2));
    setPurchase(p);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col lg="6">
            <Form
              onSubmit={handleSubmit}
              style={{
                border: "1px solid #cccccc",
                marginTop: "1rem",
              }}
            >
              <Form.Group
                style={{
                  margin: "0.5rem",
                }}
              >
                <Form.Control
                  value={purchase.name}
                  onChange={(e) => changeName(e)}
                  className="mb-2"
                  placeholder="покупка"
                />
                <Form.Control
                  value={purchase.price}
                  onChange={(e) => changePrice(e)}
                  className=""
                  placeholder="цена"
                />
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                style={{
                  border: "1px solid #cccccc",
                  margin: "0.5rem",
                }}
              >
                {markStore.allTags.map((allTag) => (
                  <Col sm="6" lg="3" key={allTag.id}>
                    <div key={allTag.id} className="mb-1">
                      <Form.Check
                        type="checkbox"
                        label={allTag.name}
                        value={allTag.name}
                        onChange={(e) => changeTag(e)}
                        checked={purchase.tags.includes(allTag.name)}
                      />
                    </div>
                  </Col>
                ))}
              </Form.Group>
              <Form.Group
                as={Row}
                style={{
                  border: "1px solid #cccccc",
                  margin: "0.5rem",
                }}
              >
                <Col
                  style={{
                    border: "1px solid #cccccc",
                    marginRight: "0.5rem",
                  }}
                >
                  <p>Необходимость</p>
                  {markStore.needs.map((need) => (
                    <div key={need.id} className="mb-1">
                      <Form.Check
                        type="radio"
                        id={need.id}
                        label={need.name}
                        value={need.name}
                        checked={need.id === purchase.needId}
                        onChange={changeNeed}
                      />
                    </div>
                  ))}
                </Col>
                <Col
                  style={{
                    border: "1px solid #cccccc",
                    // margin: "0.5rem",
                  }}
                >
                  <p>Частота</p>
                  {markStore.freqs &&
                    markStore.freqs.map((freq) => (
                      <div key={freq.id} className="mb-1">
                        <Form.Check
                          type="radio"
                          id={freq.id}
                          label={freq.name}
                          value={freq.name}
                          checked={freq.id === purchase.freqId}
                          onChange={changeFreq}
                        />
                      </div>
                    ))}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mt-3 mb-2 mr-2">
                <div className="ml-auto">
                  <Button
                    className="mr-3"
                    variant="link"
                    onClick={handleCancel}
                  >
                    Отмена
                  </Button>
                  <Button className="mr-3" variant="link" type="submit">
                    Сохранить
                  </Button>
                  {showDel && (
                    <Button className="mr-2" variant="link" onClick={handleDel}>
                      Удалить
                    </Button>
                  )}
                </div>
              </Form.Group>
            </Form>
          </Col>
          <Col lg="6"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Purchase;
