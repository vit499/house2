import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import NeedBar from "../components/NeedBar";
import PurchaseList from "../components/PurchaseList";
import Pagin from "../components/Pagin";
import FreqBar from "../components/FreqBar";
import {
  fetchFreqs,
  fetchNeeds,
  fetchAllTags,
  fetchPurchases,
} from "../http/purchaseApi";
import AllTagBar from "../components/AllTagBar";

const Shop = observer(() => {
  const { purchase } = useContext(Context);
  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);

  useEffect(() => {
    setLoad1(true);
    setLoad2(true);
    setLoad3(true);
    console.log("shop use effect1");
    fetchFreqs()
      .then((data) => {
        purchase.setFreqs(data);
        setLoad1(false);
      })
      .catch((e) => {});
    fetchNeeds()
      .then((data) => {
        purchase.setNeeds(data);
        setLoad2(false);
      })
      .catch((e) => {});
    fetchAllTags()
      .then((data) => {
        purchase.setAllTags(data);
        setLoad3(false);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    console.log("shop use effect2");
    fetchPurchases(
      purchase.selectedFreqId !== 0 ? purchase.selectedFreqId : null,
      purchase.selectedNeedId !== 0 ? purchase.selectedNeedId : null
      // purchase.selectedFreqId,
      // purchase.selectedNeedId
    )
      .then((data) => {
        console.log("shop purchases", data.count);
        purchase.setPurchases(data.rows);
        purchase.setTotalCount(data.count);
      })
      .catch((e) => {});
  }, [purchase.selectedNeedId, purchase.selectedFreqId, purchase]);

  // useEffect(() => {
  //   fetchPurchases(
  //     purchase.selectedFreq.id,
  //     purchase.selectedNeed.id,
  //     purchase.page,
  //     purchase.limit
  //   )
  //     .then((data) => {
  //       console.log("shop purchases", data.count);
  //       purchase.setPurchases(data.rows);
  //       purchase.setTotalCount(data.count);
  //     })
  //     .catch((e) => {});
  // }, [purchase]);

  if (load1 || load2 || load3) {
    return <div>load</div>;
  }
  return (
    <Container>
      <Row className="mt-5">
        <Col md={6}>
          <PurchaseList />
          <Pagin />
        </Col>
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
