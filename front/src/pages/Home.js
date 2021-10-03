import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import NeedBar from "../components/NeedBar";
import PurchaseList from "../components/PurchaseList";
import Pagin from "../components/Pagin";
import FreqBar from "../components/FreqBar";
import { fetchPurchases } from "../http/purchaseApi";
import AllTagBar from "../components/AllTagBar";

const Shop = observer(() => {
  const { purchaseStore } = useContext(Context);

  useEffect(() => {
    console.log("shop use effect2");
    fetchPurchases(
      purchaseStore.selectedFreqId !== 0 ? purchaseStore.selectedFreqId : null,
      purchaseStore.selectedNeedId !== 0 ? purchaseStore.selectedNeedId : null
    )
      .then((data) => {
        console.log("shop purchases", data.count);
        purchaseStore.setPurchases(data.rows);
        purchaseStore.setTotalCount(data.count);
      })
      .catch((e) => {});
  }, [
    purchaseStore.selectedNeedId,
    purchaseStore.selectedFreqId,
    purchaseStore,
  ]);

  // useEffect(() => {
  //   console.log("shop use effect0");
  //   fetchPurchases()
  //     .then((data) => {
  //       console.log("shop purchases0", data.count);
  //       purchaseStore.setPurchases(data.rows);
  //       purchaseStore.setTotalCount(data.count);
  //     })
  //     .catch((e) => {});
  // }, []);

  // if (load1 || load2 || load3) {
  //   return <div>load</div>;
  // }
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
