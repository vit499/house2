import { Col, Divider, Row } from "antd";
import React from "react";

const FooterComp = () => {
  return (
    <div className="sticky-bottom">
      <Divider />
      <div style={{ backgroundColor: "#adc6ff", textAlign: "center" }}>
        <Row>
          <Col span={4} offset={4}>
            <p>yyyyyyyyyyyyyyy</p>
          </Col>
          <Col span={4} offset={4}>
            <p>yyyyyyyyyyyyyyy</p>
          </Col>
          <Col span={4} offset={4}>
            <p>yyyyyyyyyyyyyyy</p>
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={6}>
            <p>xxxxxxxxxxxxxx</p>
          </Col>
          <Col span={4} offset={4}>
            <p>xxxxxxxxxxx</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FooterComp;
