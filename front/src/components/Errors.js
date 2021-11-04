import { Col, Row, Typography } from "antd";
import userStore from "../store/UserStore";

const Errors = () => {
  return (
    <Row>
      <Col
        xs={{ span: 24, offset: 0 }}
        sm={{ span: 24, offset: 0 }}
        md={{ span: 12, offset: 6 }}
        lg={{ span: 6, offset: 9 }}
        style={{ marginBottom: "1rem" }}
      >
        <Typography.Title
          level={5}
          style={{ textAlign: "center", color: "#ff7875" }}
        >
          {userStore.errors.message}
        </Typography.Title>
      </Col>
    </Row>
  );
};

export default Errors;
