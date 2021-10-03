import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { Context } from "..";

const Pagin = observer(() => {
  const { purchaseStore } = useContext(Context);
  //const [pages, setPages] = useState([]);

  // console.log("pagin", purchaseStore);
  // useEffect(() => {
  //   const pageCnt = Math.ceil(purchaseStore.totalCount / purchaseStore.limit);
  //   const ps = [];
  //   for (let i = 0; i < pageCnt; i++) ps.push(i + 1);
  //   console.log("pagin, total, pcnt, ps", purchaseStore.totalCount, pageCnt, ps);
  //   setPages(ps);
  // }, []);

  const pageCnt = Math.ceil(purchaseStore.totalCount / purchaseStore.limit);
  const pages = [];
  // console.log(
  //   "pagin, total, pcnt, ps",
  //   purchaseStore.totalCount,
  //   pageCnt,
  //   pages
  // );

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
            active={purchaseStore.page === page}
            onClick={() => purchaseStore.setPage(page)}
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
