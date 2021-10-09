import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Context } from "..";

const Pur = observer(({ showDel, handleSubmit, handleCancel, handleDel }) => {
  const { markStore, purStore } = useContext(Context);

  if (!purStore.Pur) {
    console.log("no pur");
    return <div>no Pur</div>;
  }
  const changeName = (e) => {
    const name = e.target.value;
    purStore.setName(name);
  };
  const changePrice = (e) => {
    let n = Number(e.target.value);
    let price;
    if (isNaN(n)) price = 0;
    else price = n;
    purStore.setPrice(price);
  };
  const changeTag = (e) => {
    const tag = e.target.value;
    let tags;
    if (purStore.Pur.tags.includes(tag)) {
      tags = purStore.Pur.tags.filter((t) => t !== tag);
    } else {
      tags = [...purStore.Pur.tags, tag];
    }
    purStore.setTags(tags);
  };
  const changeNeed = (e) => {
    const needId = Number(e.target.id);
    console.log("change need", needId);
    purStore.setNeedId(needId);
  };
  const changeFreq = (e) => {
    const freqId = Number(e.target.id);
    console.log("change need", freqId);
    purStore.setFreqId(freqId);
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
                  value={purStore.Pur.name}
                  onChange={(e) => changeName(e)}
                  className="mb-2"
                  placeholder="покупка"
                />
                <Form.Control
                  value={purStore.Pur.price}
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
                {markStore.tags.map((allTag) => (
                  <Col sm="6" lg="3" key={allTag.id}>
                    <div key={allTag.id} className="mb-1">
                      <Form.Check
                        type="checkbox"
                        label={allTag.name}
                        value={allTag.name}
                        onChange={(e) => changeTag(e)}
                        checked={purStore.Pur.tags.includes(allTag.name)}
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
                        checked={need.id === purStore.Pur.needId}
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
                          checked={freq.id === purStore.Pur.freqId}
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
                  <Button
                    className="mr-3"
                    variant="link"
                    type="submit"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
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
});

export default Pur;
