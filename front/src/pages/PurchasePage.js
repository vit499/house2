import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import { useParams } from "react-router-dom";
import { fetchOnePurchase } from "../http/purchaseApi";

const PurchasePage = observer(() => {
  const [purchase, setPurchase] = useState({ tags: [] });
  const [load, setLoad] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function f() {
      try {
        const data = await fetchOnePurchase(id);
        if (data) {
          setPurchase(data);
        }
      } catch (err) {}
      setLoad(false);
    }
    f();
  }, [id]);

  if (!purchase) {
    return <div>no purchase</div>;
  }
  if (load) {
    return (
      <div>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  return (
    <Container className="mt-3">
      <Form>
        {purchase.needs &&
          purchase.needs.map((need) => (
            <div key={need.id} className="mb-1">
              <Form.Check type="radio" label={need.name} />
            </div>
          ))}
        {purchase.freqs &&
          purchase.freqs.map((freq) => (
            <div key={freq.id} className="mb-1">
              <Form.Check type="radio" label={freq.name} />
            </div>
          ))}
        {purchase.allTags &&
          purchase.allTags.map((tag) => (
            <div key={tag.id} className="mb-1">
              <Form.Check type="checkbox" label={tag.name} />
            </div>
          ))}
      </Form>
    </Container>
  );
});

export default PurchasePage;
