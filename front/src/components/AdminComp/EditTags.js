import { Button, Col, Input, Row, Form } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ADMIN_ROUTE } from "../../utils/const";
import markStore from "../../store/MarkStore";

const EditTags = observer(() => {
  const [name, setName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    setIsSubmit(true);
  };
  const handleCancel = (e) => {
    history.push(ADMIN_ROUTE);
  };
  const handleDel = (id) => {};
  useEffect(() => {
    if (!isSubmit) return;
    markStore.createTag(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);
  return (
    <div style={{ margin: "2rem 1rem 1rem 1rem" }}>
      <Row>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 8, offset: 8 }}
          lg={{ span: 8, offset: 8 }}
          style={{ border: "1px solid #91d5ff" }}
        >
          <p style={{ textAlign: "center", marginBottom: "1rem" }}>-</p>
          <Form
            onFinish={handleSubmit}
            autoComplete="off"
            style={{ margin: "1rem" }}
          >
            {markStore.tags &&
              markStore.tags.map((t) => (
                <div
                  key={t.id}
                  style={{
                    border: "1px solid #91d5ff",
                    padding: ".25rem",
                    marginBottom: ".25rem",
                  }}
                >
                  <Row>
                    <Col>
                      <div>{t.name}</div>
                    </Col>
                    <Col style={{ marginLeft: "auto" }}>
                      <Button
                        type="default"
                        danger
                        onClick={() => handleDel(t.id)}
                      >
                        Удалить
                      </Button>
                    </Col>
                    <Col></Col>
                  </Row>
                </div>
              ))}

            <Input
              placeholder="Tag"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: "1rem", marginTop: ".5rem" }}
            />

            <Row style={{ justifyContent: "flex-end", marginTop: "2rem" }}>
              <Col style={{ marginRight: "2rem" }}>
                <Form.Item>
                  <Button type="default" onClick={handleCancel}>
                    Отмена
                  </Button>
                </Form.Item>
              </Col>
              <Col style={{ marginRight: "2rem" }}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={markStore.load === "load"}
                  >
                    Добавить
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
});

export default EditTags;
