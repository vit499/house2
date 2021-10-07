import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { Context } from "..";

const NeedBar = observer(() => {
  const { markStore, purchaseStore } = useContext(Context);

  const handleChange = (e) => {
    e.persist();
    const id = Number(e.target.id);
    console.log("need id", id);
    purchaseStore.setSelectedNeedId(id);
  };

  if (!markStore) {
    console.log("no needs no dev");
    // return <div>no freqs</div>;
  }
  if (!markStore.needs) {
    console.log("no needs");
    return <div>no list</div>;
  }
  return (
    <>
      <p>Необходимость</p>
      <Form>
        {markStore.needs &&
          markStore.needs.map((need) => (
            <div key={need.id} className="mb-1">
              <Form.Check
                type="radio"
                id={need.id}
                label={need.name}
                value={need.name}
                checked={need.id === purchaseStore.selectedNeedId}
                onChange={handleChange}
              />
            </div>
          ))}
        <Form.Check
          type="radio"
          id="0"
          label="-"
          value="off"
          checked={purchaseStore.selectedNeedId === 0}
          onChange={handleChange}
        />
      </Form>
    </>
  );
});

export default NeedBar;
