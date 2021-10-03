import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { Context } from "..";
import Load from "../components/Load";
import { fetchOnePurchase } from "../http/purchaseApi";

const PurchasePage = observer(() => {
  const { markStore } = useContext(Context);
  const [purchase, setPurchase] = useState(null);
  const [load, setLoad] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function f() {
      setLoad(true);
      try {
        const data = await fetchOnePurchase(id);
        if (data) {
          setPurchase(data);
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
    <Container className="mt-3">
      <Row>
        <Col>
          <Card>
            <Row>
              <Col>
                <div className="pl-2">{purchase.name}</div>
              </Col>
              <Col>
                <div className="pr-2" style={{ textAlignLast: "end" }}>
                  {purchase.price.toString()}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>{markStore.needs[purchase.needId - 1].name} </div>
              </Col>
              <Col>
                <div>{markStore.freqs[purchase.freqId - 1].name} </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>{purchase.tags}</div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col className="mt-3">
          <Button size="sm" className="mr-2">
            Edit
          </Button>
          <Button size="sm" className="mr-2">
            Del
          </Button>
          {/* <Row>
            <Col>
              <div>
                <Button className="mr-4">Edit</Button>
              </div>
            </Col>
            <Col>
              <div>
                <Button className="mr-4">Del</Button>
              </div>
            </Col>
          </Row> */}
        </Col>
      </Row>
    </Container>
  );
});

export default PurchasePage;
