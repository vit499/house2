import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Card, Form, Row } from "react-bootstrap";
import { Context } from "..";

const NeedBar = observer(() => {
  const { purchase } = useContext(Context);
  const [indexRadio, setIndexRadio] = useState(0);

  const handleChange = (e) => {
    e.persist();
    const id = Number(e.target.id);
    console.log("need id", id);
    setIndexRadio(id);
    purchase.setSelectedNeedId(id);
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
      <p>Необходимость</p>
      <Form>
        {purchase.needs &&
          purchase.needs.map((need) => (
            <div key={need.id} className="mb-1">
              <Form.Check
                type="radio"
                id={need.id}
                label={need.name}
                value={need.name}
                checked={need.id === indexRadio}
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

export default NeedBar;
