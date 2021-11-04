import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
// import "./style.css";
import TagsComp from "../components/markcomp/TagsComp";
import NeedsComp from "../components/markcomp/NeedsComp";
import FreqsComp from "../components/markcomp/FreqsComp";
import { useHistory } from "react-router";
import { EDITPUR_ROUTE } from "../utils/const";
import Load from "../components/Load";
import Errors from "../components/Errors";
import moment from "moment";
import SelectDatePick from "../components/datepickcomp/SelectDatePick";
import markStore from "../store/MarkStore";
import purStore from "../store/PurStore";
import onePurStore from "../store/OnePurStore";

const PurListPage = observer(() => {
  const history = useHistory();

  const handleTag = (e) => {
    markStore.setCheckTag(e.target.value, purStore);
  };
  const handleNeed = (e) => {
    markStore.setCheckNeed(e.target.value, purStore);
  };
  const handleFreq = (e) => {
    markStore.setCheckFreq(e.target.value, purStore);
  };
  const handleClick = (p) => {
    // console.log("choise p", JSON.stringify(p, null, 2));
    onePurStore.Init(
      markStore.tags,
      p.id,
      p.name,
      p.price,
      p.needId,
      p.freqId,
      p.tags,
      p.date
    );
    history.push(`${EDITPUR_ROUTE}/${p.id}`);
  };

  useEffect(() => {
    if (!purStore.needReq) {
      purStore.setNeedReq(true);
      return;
    }
    // console.log("shop use effect2");
    purStore.fetchPurchases(
      purStore.selectedFreqId !== 0 ? purStore.selectedFreqId : null,
      purStore.selectedNeedId !== 0 ? purStore.selectedNeedId : null
    );
    // purStore.getAll();
  }, []);

  if (purStore.load === "load") {
    return <Load />;
  }
  if (purStore.load === "err") {
    return <Errors />;
  }

  return (
    <>
      <Row style={{ margin: ".5rem" }}>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 12, offset: 6 }}
        >
          <SelectDatePick />
          {` =${purStore.sum}руб`}
        </Col>
      </Row>
      <Row>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 6, offset: 6 }}
        >
          {purStore.Purs.map((p, ind) => (
            <div
              key={p.id}
              className="m-1 pe-5"
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              onClick={() => handleClick(p)}
            >
              <div>{`${moment(p.date).format("MM/DD")}  ${p.name} `}</div>
              <div>{`${p.price}    `}</div>
            </div>
          ))}
        </Col>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 6, offset: 0 }}
        >
          <Row>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 8, offset: 0 }}
            >
              <TagsComp handle={handleTag} />
            </Col>
            <Col
              xs={{ span: 12, offset: 0 }}
              sm={{ span: 12, offset: 0 }}
              md={{ span: 7, offset: 1 }}
            >
              <NeedsComp handle={handleNeed} />
            </Col>
            <Col xs={12} sm={12} md={8}>
              <FreqsComp handle={handleFreq} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
});

export default PurListPage;
