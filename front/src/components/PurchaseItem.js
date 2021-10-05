import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { PURCHASE_ROUTE } from "../utils/const";

const PurchaseItem = ({ purchase }) => {
  // const { markStore } = useContext(Context);
  const history = useHistory();
  const handle = () => {
    // history.push(PURCHASE_ROUTE + "/" + purchase.id);
    history.push({
      pathname: `${PURCHASE_ROUTE}/${purchase.id}`,
      state: { referer: history.location.pathname },
    });
  };

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
      </Card>
    </div>
  );
};

export default PurchaseItem;
