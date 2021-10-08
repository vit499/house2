import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { Context } from "..";

const AllTagBar = observer(() => {
  const { markStore } = useContext(Context);

  if (!markStore) {
    console.log("no tags no dev");
    // return <div>no tags</div>;
  }
  if (!markStore.tags) {
    console.log("no tags");
    // return <div>no tags</div>;
  }
  return (
    <div>
      <Form>
        {markStore.tags &&
          markStore.tags.map((allTag) => (
            <div key={allTag.id} className="mb-1">
              <Form.Check type="checkbox" label={allTag.name} />
            </div>
          ))}
      </Form>
    </div>
  );
});

export default AllTagBar;
