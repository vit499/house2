import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateNeed from "../components/modals/CreateNeed";
import CreateFreq from "../components/modals/CreateFreq";
import CreateTag from "../components/modals/CreateTag";
import DropDb from "../components/modals/DropDb";

const Admin = () => {
  const [showFreq, setShowFreq] = useState(false);
  const [showNeed, setShowNeed] = useState(false);
  const [showTag, setShowTag] = useState(false);
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
          setShowTag(true);
        }}
      >
        add tag
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
      <CreateTag show={showTag} onHide={() => setShowTag(false)} />
      <DropDb show={showDrop} onHide={() => setShowDrop(false)} />
    </Container>
  );
};

export default Admin;
