import { Col, Row } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { observer } from "mobx-react-lite";
import React from "react";
import markStore from "../../store/MarkStore";

const TagsComp = observer(({ handle }) => {
  return (
    <Row
      style={{
        marginRight: "0.5rem",
      }}
    >
      {markStore.tags.map((t) => (
        <Col xs={12} sm={12} md={24} lg={24} key={t.id}>
          <Checkbox
            value={t.id}
            style={{ lineHeight: "32px" }}
            checked={t.checked}
            onChange={handle}
          >
            {t.name}
          </Checkbox>
        </Col>
      ))}
    </Row>
  );
});

export default TagsComp;
