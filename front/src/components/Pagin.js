import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { Context } from "..";

const Pagin = observer(() => {
  const { purchase } = useContext(Context);
  //const [pages, setPages] = useState([]);

  // console.log("pagin", purchase);
  // useEffect(() => {
  //   const pageCnt = Math.ceil(purchase.totalCount / purchase.limit);
  //   const ps = [];
  //   for (let i = 0; i < pageCnt; i++) ps.push(i + 1);
  //   console.log("pagin, total, pcnt, ps", purchase.totalCount, pageCnt, ps);
  //   setPages(ps);
  // }, []);

  const pageCnt = Math.ceil(purchase.totalCount / purchase.limit);
  const pages = [];
  console.log("pagin, total, pcnt, ps", purchase.totalCount, pageCnt, pages);

  for (let i = 0; i < pageCnt; i++) {
    pages.push(i + 1);
  }

  return (
    <div>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        {pages.map((page) => (
          <Pagination.Item
            key={page}
            active={purchase.page === page}
            onClick={() => purchase.setPage(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
});

export default Pagin;
