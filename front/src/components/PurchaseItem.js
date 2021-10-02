import React, { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { PURCHASE_ROUTE } from "../utils/const";

const PurchaseItem = ({ p }) => {
  const { purchase } = useContext(Context);
  const history = useHistory();
  const handle = () => {
    history.push(PURCHASE_ROUTE + "/" + p.id);
  };
  console.log("p", p);
  return (
    <div md={3} onClick={handle}>
      <Card className="mb-2" style={{ cursor: "pointer" }} border={"dark"}>
        <Row>
          <Col>
            <div>{p.name}</div>
          </Col>
          <Col>
            <div>{p.price.toString()}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>{purchase.needs[p.needId - 1].name} </div>
          </Col>
          <Col>
            <div>{purchase.freqs[p.freqId - 1].name} </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PurchaseItem;
