import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";

import { useParams } from "react-router-dom";
import { Context } from "..";
import Load from "../components/Load";
import { fetchOnePurchase } from "../http/purchaseApi";

const PurchasePage = observer(() => {
  const { markStore } = useContext(Context);
  const [purchase, setPurchase] = useState(null);
  // const [purchaseNew, setPurchaseNew] = useState(null);
  const [load, setLoad] = useState(false);
  const { id } = useParams();

  const changeName = (e) => {
    const name = e.target.value;
    const p = { ...purchase, name };
    setPurchase(p);
  };
  const changePrice = (e) => {
    const price = Number(e.target.value);
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
  const submit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    async function f() {
      setLoad(true);
      try {
        const data = await fetchOnePurchase(id);
        if (data) {
          const tags = data.tags.split(" ");
          const p = { ...data, tags: tags };
          setPurchase(p);
        }
      } catch (err) {}
      setLoad(false);
    }
    f();
  }, [id]);

  // console.log("p page", JSON.stringify(purchase, null, 2));

  if (load) {
    return <Load />;
  }
  if (!purchase) {
    return <div>no purchase</div>;
  }

  return (
    <Container>
      <Row>
        <Col lg="6">
          <Form
            onSubmit={submit}
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
                <Button className="mr-3" variant="link">
                  Отмена
                </Button>
                <Button className="mr-3" variant="link" type="submit">
                  Сохранить
                </Button>
                <Button className="mr-2" variant="link">
                  Удалить
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Col>
        <Col lg="6"></Col>
      </Row>
    </Container>
  );
  // return (
  //   <Container className="mt-3">
  //     <Card style={{ width: "36rem" }}>
  //       <Card.Body>
  //         <Form className="">
  //           <Form.Control
  //             value={purchase.name}
  //             onChange={(e) => changeName(e)}
  //             className="mb-2"
  //             placeholder="покупка"
  //           />
  //           <Form.Control
  //             value={purchase.price}
  //             onChange={(e) => changePrice(e)}
  //             className=""
  //             placeholder="цена"
  //           />
  //         </Form>
  //       </Card.Body>

  //       <ListGroup className="list-group-flush">
  //         <ListGroupItem>
  //           <Row>
  //             {markStore.allTags.map((allTag) => (
  //               <Col md="3" key={allTag.id}>
  //                 <div key={allTag.id} className="mb-1">
  //                   <Form.Check
  //                     type="checkbox"
  //                     label={allTag.name}
  //                     value={allTag.name}
  //                     onChange={(e) => changeTag(e)}
  //                     checked={purchase.tags.includes(allTag.name)}
  //                   />
  //                 </div>
  //               </Col>
  //             ))}
  //           </Row>
  //         </ListGroupItem>
  //         <ListGroupItem>{purchase.tags.join(" ")}</ListGroupItem>
  //         <Row>
  //           <Col>
  //             <ListGroupItem>
  //               <Form>
  //                 {/* {markStore.needs[purchase.needId - 1].name} */}
  //                 {markStore.needs.map((need) => (
  //                   <div key={need.id} className="mb-1">
  //                     <Form.Check
  //                       type="radio"
  //                       id={need.id}
  //                       label={need.name}
  //                       value={need.name}
  //                       checked={need.id === purchase.needId}
  //                       onChange={changeNeed}
  //                     />
  //                   </div>
  //                 ))}
  //               </Form>
  //             </ListGroupItem>
  //           </Col>
  //           <Col>
  //             <ListGroupItem>
  //               <Form>
  //                 {markStore.freqs &&
  //                   markStore.freqs.map((freq) => (
  //                     <div key={freq.id} className="mb-1">
  //                       <Form.Check
  //                         type="radio"
  //                         id={freq.id}
  //                         label={freq.name}
  //                         value={freq.name}
  //                         checked={freq.id === purchase.freqId}
  //                         onChange={changeFreq}
  //                       />
  //                     </div>
  //                   ))}
  //               </Form>
  //             </ListGroupItem>
  //           </Col>
  //         </Row>
  //       </ListGroup>
  //       <Card.Body className="ml-auto">
  //         <Card.Link href="#">Отмена</Card.Link>
  //         <Card.Link href="#">Сохранить</Card.Link>
  //         <Card.Link href="#">Удалить</Card.Link>
  //       </Card.Body>
  //     </Card>
  //   </Container>
  // );

  // return (
  //   <Container className="mt-3">
  //     <Card style={{ width: "36rem" }}>
  //       <Card.Header>{purchase.name}</Card.Header>
  //       <Card.Body>
  //         <Card.Text>{purchase.price.toString()}</Card.Text>
  //       </Card.Body>
  //       <ListGroup className="list-group-flush">
  //         <ListGroupItem>
  //           {markStore.needs[purchase.needId - 1].name}
  //         </ListGroupItem>
  //         <ListGroupItem>
  //           {markStore.freqs[purchase.freqId - 1].name}
  //         </ListGroupItem>
  //         <ListGroupItem>{purchase.tags}</ListGroupItem>
  //       </ListGroup>
  //       <Card.Body className="ml-auto">
  //         <Card.Link href="#">Отмена</Card.Link>
  //         <Card.Link href="#">Сохранить</Card.Link>
  //         <Card.Link href="#">Удалить</Card.Link>
  //       </Card.Body>
  //     </Card>
  //   </Container>
  // );
});

export default PurchasePage;
