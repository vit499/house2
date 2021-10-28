import { Button, Col, Row, Typography } from "antd";
import React from "react";
import { useHistory } from "react-router";
import { EDIT_TAGS_ROUTE } from "../utils/const";

const AdminPage = () => {
  const history = useHistory();

  return (
    <Row>
      <Col
        xs={{ span: 24, offset: 0 }}
        sm={{ span: 20, offset: 2 }}
        md={{ span: 8, offset: 8 }}
        lg={{ span: 8, offset: 8 }}
      >
        <Typography.Title
          level={4}
          style={{ textAlign: "center", margin: "1rem" }}
        >
          Admin
        </Typography.Title>
        <Button
          type="default"
          style={{ width: "100%", margin: ".5rem" }}
          onClick={() => history.push(EDIT_TAGS_ROUTE)}
        >
          Добавить tag
        </Button>
        <Button
          type="default"
          style={{ width: "100%", margin: ".5rem" }}
          onClick={() => history.push(EDIT_TAGS_ROUTE)}
        >
          Добавить need
        </Button>
        <Button
          type="default"
          style={{ width: "100%", margin: ".5rem" }}
          onClick={() => history.push(EDIT_TAGS_ROUTE)}
        >
          Добавить freq
        </Button>
      </Col>
    </Row>
  );
};

export default AdminPage;
