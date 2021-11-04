import { Col, Row } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { observer } from "mobx-react-lite";
import React from "react";
import markStore from "../../store/MarkStore";
import onePurStore from "../../store/OnePurStore";

const TagsAddComp = observer(() => {
  const isTag = (tag) => {
    return onePurStore.tags.includes(tag.name);
  };
  const handle = (id) => {
    onePurStore.setTag(id);
  };
  return (
    <Row style={{ border: "1px solid #91d5ff", marginTop: ".5rem" }}>
      {markStore.tags.map((t) => (
        <Col xs={12} sm={12} md={6} lg={6} key={t.id}>
          <Checkbox
            value={t.id}
            style={{ lineHeight: "32px", marginLeft: ".5rem" }}
            checked={isTag(t)}
            onChange={() => handle(t.id)}
          >
            {t.name}
          </Checkbox>
        </Col>
      ))}
    </Row>
  );
});

export default TagsAddComp;
