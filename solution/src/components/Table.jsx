import { useState } from "react";
import TableItems from "./TableItems";
import "./styles/table.css";
import ReactPaginate from "react-paginate";
import SaveTableButton from "./SaveTableButton";
import Loader from "./Loader";

const Table = ({
  tableData,
  csvData,
  setCsvData,
  itemsPerPage,
  postNewData,
  isResponseSuccess,
  isBtnLabelSaved,
}) => {
  const { data } = tableData;
  const withoutHeader = data && data.slice(1);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = withoutHeader.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(withoutHeader.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % withoutHeader.length;
    setItemOffset(newOffset);
  };

  const addNewItem = () => {
    const emptyValues = Array.from(
      { length: csvData.data[0].length },
      () => undefined
    );
    setCsvData((prevItems) => {
      console.log({ prevItems: prevItems.data });
      const newItems = [...prevItems.data];
      newItems.splice(endOffset, 0, emptyValues);
      return { data: newItems };
    });
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
            <TableItems
              currentItems={currentItems}
              setCsvData={setCsvData}
              itemOffset={itemOffset}
            />
          </tbody>
        </table>
        <div className="btns-container">
          <button className="btn btn-add" onClick={addNewItem}>
            +
          </button>
          {isResponseSuccess ? (
            <SaveTableButton
              postNewData={postNewData}
              isBtnLabelSaved={isBtnLabelSaved}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={"pagination-container"}
        activeClassName={"active-page"}
      />
    </div>
  );
};

export default Table;
