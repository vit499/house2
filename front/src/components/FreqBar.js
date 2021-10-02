import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { Context } from "..";

const FreqBar = observer(() => {
  const { purchase } = useContext(Context);
  const [indexRadio, setIndexRadio] = useState(0);

  const handleChange = (e) => {
    e.persist();
    const id = Number(e.target.id);
    console.log("freq id", id);
    setIndexRadio(id);
    purchase.setSelectedFreqId(id);
  };
  if (!purchase) {
    console.log("no freqs no dev");
    // return <div>no freqs</div>;
  }
  if (!purchase.freqs) {
    console.log("no freqs");
    return <div>no list</div>;
  }
  return (
    <>
      <p>Частота</p>
      <Form>
        {purchase.freqs &&
          purchase.freqs.map((freq) => (
            <div key={freq.id} className="mb-1">
              <Form.Check
                type="radio"
                id={freq.id}
                label={freq.name}
                value={freq.name}
                checked={freq.id === indexRadio}
                onChange={handleChange}
              />
            </div>
          ))}
        <Form.Check
          type="radio"
          id="0"
          label="-"
          value="off"
          checked={indexRadio === 0}
          onChange={handleChange}
        />
      </Form>
    </>
  );
});

export default FreqBar;
