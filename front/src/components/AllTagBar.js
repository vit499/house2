import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { Context } from "..";

const AllTagBar = observer(() => {
  const { purchase } = useContext(Context);

  if (!purchase) {
    console.log("no allTags no dev");
    // return <div>no allTags</div>;
  }
  if (!purchase.allTags) {
    console.log("no allTags");
    // return <div>no allTags</div>;
  }
  return (
    <div>
      <Form>
        {purchase.allTags &&
          purchase.allTags.map((allTag) => (
            <div key={allTag.id} className="mb-1">
              <Form.Check type="checkbox" label={allTag.name} />
            </div>
          ))}
      </Form>
    </div>
  );
});

export default AllTagBar;
