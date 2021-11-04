import { Button, Col, Row, Typography } from "antd";
import React from "react";
import { useHistory } from "react-router";
import { EDIT_TAGS_ROUTE } from "../utils/const";
import userStore from "../store/UserStore";

const AdminPage = () => {
  const history = useHistory();

  const handleDrop = () => {
    userStore.dropDb();
  };
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
          onClick={handleDrop}
          disabled
        >
          Очистить базу
        </Button>
      </Col>
    </Row>
  );
};

export default AdminPage;
