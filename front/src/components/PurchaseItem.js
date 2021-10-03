import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { PURCHASE_ROUTE } from "../utils/const";

const PurchaseItem = ({ purchase }) => {
  // const { markStore } = useContext(Context);
  const history = useHistory();
  const handle = () => {
    history.push(PURCHASE_ROUTE + "/" + purchase.id);
  };

  // console.log("purchase", purchase);
  // console.log("purchase", purchase.tags);
  return (
    <div onClick={handle}>
      <Card className="mb-1" style={{ cursor: "pointer" }}>
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
        {/* <Row>
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
        </Row> */}
      </Card>
    </div>
  );
};

export default PurchaseItem;
