import { Col, Row, Typography } from "antd";
import React from "react";
import { observer } from "mobx-react-lite";
// import { Context } from "../index";
import foto from "../../assets/1.jpg";
import "./style.css";

const HomePage = observer(() => {
  // const { purStore, markStore } = useContext(Context);

  // const handleTag = (e) => {
  //   markStore.setCheckTag(e.target.value, purStore);
  // };
  // const handleNeed = (e) => {
  //   markStore.setCheckNeed(e.target.value, purStore);
  // };
  // const handleFreq = (e) => {
  //   markStore.setCheckFreq(e.target.value, purStore);
  // };
  return (
    <Row>
      <Col
        xs={{ span: 12, offset: 0 }}
        sm={{ span: 12, offset: 0 }}
        md={{ span: 12, offset: 0 }}
        lg={{ span: 10, offset: 4 }}
        // style={{ backgroundColor: "lightGray" }}
      >
        <Typography.Title level={4} style={{ textAlign: "center" }}>
          Ку-ку
        </Typography.Title>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            background: `url(${foto}) no-repeat center center`,
            width: "100%",
            height: "60vh",
            backgroundSize: "cover",
            fontSize: 64,
          }}
        ></div>
      </Col>
      <Col
        xs={{ span: 12, offset: 0 }}
        sm={{ span: 12, offset: 0 }}
        md={{ span: 12, offset: 0 }}
        lg={{ span: 6, offset: 0 }}
      >
        <Typography.Title level={4} style={{ textAlign: "center" }}>
          да
        </Typography.Title>
      </Col>
    </Row>
  );
});

export default HomePage;
