import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import NeedBar from "../components/NeedBar";
import PurchaseList from "../components/PurchaseList";
import Pagin from "../components/Pagin";
import FreqBar from "../components/FreqBar";
import AllTagBar from "../components/AllTagBar";
import Load from "../components/Load";
import Err from "../components/Err";

const Shop = observer(() => {
  const { purchaseStore } = useContext(Context);

  useEffect(() => {
    if (!purchaseStore.reqPurchase) {
      purchaseStore.setReqPurchase(true);
      console.log("cancel");
      return;
    }
    console.log("shop use effect2");
    purchaseStore.fetchPurchases(
      purchaseStore.selectedFreqId !== 0 ? purchaseStore.selectedFreqId : null,
      purchaseStore.selectedNeedId !== 0 ? purchaseStore.selectedNeedId : null
    );
  }, [
    purchaseStore.selectedNeedId,
    purchaseStore.selectedFreqId,
    purchaseStore,
  ]);

  if (purchaseStore.load === "load") {
    return <Load />;
  }
  if (purchaseStore.load === "err") {
    return <Err />;
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md={4}>
          <PurchaseList />
          <Pagin />
        </Col>
        <Col md={2}></Col>
        <Col md={2}>
          <AllTagBar />
        </Col>
        <Col md={2}>
          <NeedBar />
        </Col>
        <Col md={2}>
          <FreqBar />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
