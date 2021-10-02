import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateNeed from "../components/modals/CreateNeed";
import CreatePurchase from "../components/modals/CreatePurchase";
import CreateFreq from "../components/modals/CreateFreq";
import DropDb from "../components/modals/DropDb";

const Admin = () => {
  const [showFreq, setShowFreq] = useState(false);
  const [showNeed, setShowNeed] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  return (
    <Container className="d-flex flex-column">
      <Button
        variant="outline-dark"
        className="mt-2"
        onClick={() => {
          setShowFreq(true);
        }}
      >
        add freq
      </Button>
      <Button
        variant="outline-dark"
        className="mt-2"
        onClick={() => {
          setShowNeed(true);
        }}
      >
        add need
      </Button>
      <Button
        variant="outline-dark"
        className="mt-2"
        onClick={() => {
          setShowPurchase(true);
        }}
      >
        add purchase
      </Button>
      <Button
        variant="outline-dark"
        className="mt-2"
        onClick={() => {
          setShowDrop(true);
        }}
      >
        drop db
      </Button>
      <CreateFreq show={showFreq} onHide={() => setShowFreq(false)} />
      <CreateNeed show={showNeed} onHide={() => setShowNeed(false)} />
      <CreatePurchase
        show={showPurchase}
        onHide={() => setShowPurchase(false)}
      />
      <DropDb show={showDrop} onHide={() => setShowDrop(false)} />
    </Container>
  );
};

export default Admin;
