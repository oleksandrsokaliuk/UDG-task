import { useState } from "react";
import TableItems from "./TableItems";
import "./styles/table.css";
import ReactPaginate from "react-paginate";

const Table = ({ tableData, setCsvData, itemsPerPage }) => {
  const { data } = tableData;
  const withoutHeader = data && data.slice(1);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  console.log({ withoutHeader });
  const currentItems = withoutHeader.slice(itemOffset, endOffset);
  console.log(currentItems);
  const pageCount = Math.ceil(withoutHeader.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % withoutHeader.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {data && data[0].map((title, idx) => <th key={idx}>{title}</th>)}
            </tr>
          </thead>
          <tbody>
            <TableItems currentItems={currentItems} setCsvData={setCsvData} />
          </tbody>
        </table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination-container"}
        activeClassName={"active-page"}
      />
    </div>
  );
};

export default Table;
