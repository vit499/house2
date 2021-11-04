import { Button, Col, Input, Row, Form, DatePicker } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import "moment/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import FreqsAddComp from "./markcomp/FreqsAddComp";
import NeedsAddComp from "./markcomp/NeedsAddComp";
import TagsAddComp from "./markcomp/TagsAddComp";
import moment from "moment";
import onePurStore from "../store/OnePurStore";
import purStore from "../store/PurStore";

const Pur = observer(
  ({ showDel, handleSubmit, handleCancel, handleDelete }) => {
    // const [name, setName] = useState("");
    // const [price, setPrice] = useState(0);

    const hChangeName = (e) => {
      const n = e.target.value;
      onePurStore.setName(n);
    };
    const hChangePrice = (e) => {
      const n = e.target.value;
      const x = onePurStore.price.toString();
      if (n.length > x.length) {
        const a = n.substring(x.length);
        if (isNaN(a)) return;
      }
      let p = Number(n);
      if (isNaN(p)) p = 0;
      onePurStore.setPrice(p);
    };
    const hChangeDate = (date, dateString) => {
      if (!date) return;
      onePurStore.setDate(moment(date).toISOString());
    };
    const dateFormat = "YYYY/MM/DD";

    useEffect(() => {
      // setName(onePurStore.name);
      // setPrice(onePurStore.price);
    }, []);
    // console.log("pur", JSON.stringify(onePurStore.tags, null, 2));

    return (
      <div style={{ margin: "2rem 1rem 1rem 1rem" }}>
        <Row>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 16, offset: 4 }}
            lg={{ span: 12, offset: 6 }}
            style={{ border: "1px solid #91d5ff" }}
          >
            <p style={{ textAlign: "center", marginBottom: "1rem" }}>Покупка</p>
            <Form
              onFinish={handleSubmit}
              autoComplete="off"
              style={{ margin: "1rem" }}
            >
              <Input
                placeholder="Товар"
                value={onePurStore.name}
                onChange={hChangeName}
                style={{ marginBottom: "1rem" }}
              />

              <Input
                placeholder="Цена"
                value={onePurStore.price}
                onChange={hChangePrice}
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                }}
              />

              <TagsAddComp />
              <Row style={{ marginTop: ".5rem" }}>
                <Col span={11} style={{ border: "1px solid #91d5ff" }}>
                  <NeedsAddComp />
                </Col>
                <Col
                  span={12}
                  offset={1}
                  style={{ border: "1px solid #91d5ff" }}
                >
                  <FreqsAddComp />
                </Col>
              </Row>
              <Row style={{ marginTop: ".5rem" }}>
                <DatePicker
                  locale={locale}
                  value={moment(onePurStore.date, dateFormat)}
                  format={dateFormat}
                  onChange={hChangeDate}
                />
              </Row>

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
                      loading={purStore.load === "load"}
                    >
                      Сохранить
                    </Button>
                  </Form.Item>
                </Col>
                {showDel && (
                  <Col style={{ marginRight: "2rem" }}>
                    <Form.Item>
                      <Button danger onClick={handleDelete}>
                        Удалить
                      </Button>
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
);

export default Pur;
