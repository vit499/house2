import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { Context } from "..";

const FreqBar = observer(() => {
  const { markStore, purchaseStore } = useContext(Context);

  const handleChange = (e) => {
    e.persist();
    const id = Number(e.target.id);
    console.log("freq id", id);
    purchaseStore.setSelectedFreqId(id);
  };
  if (!markStore) {
    console.log("no freqs no dev");
    // return <div>no freqs</div>;
  }
  if (!markStore.freqs) {
    console.log("no freqs");
    return <div>no list</div>;
  }

  return (
    <>
      <p>Частота</p>
      <Form>
        {markStore.freqs &&
          markStore.freqs.map((freq) => (
            <div key={freq.id} className="mb-1">
              <Form.Check
                type="radio"
                id={freq.id}
                label={freq.name}
                value={freq.name}
                checked={freq.id === purchaseStore.selectedFreqId}
                onChange={handleChange}
              />
            </div>
          ))}
        <Form.Check
          type="radio"
          id="0"
          label="-"
          value="off"
          checked={purchaseStore.selectedFreqId === 0}
          onChange={handleChange}
        />
      </Form>
    </>
  );
});

export default FreqBar;
