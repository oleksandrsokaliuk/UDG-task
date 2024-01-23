import { useState } from "react";
import TableItems from "./TableItems";
import "./styles/table.css";
import ReactPaginate from "react-paginate";
import SaveTableButton from "./SaveTableButton";

const Table = ({
  tableData,
  csvData,
  setCsvData,
  itemsPerPage,
  postNewData,
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

  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

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
              setIsSaveButtonEnabled={setIsSaveButtonEnabled}
              itemOffset={itemOffset}
            />
          </tbody>
        </table>
        <div className="btns-container">
          <button className="btn-add" onClick={addNewItem}>
            Add New Item
          </button>
          <SaveTableButton
            isSaveButtonEnabled={isSaveButtonEnabled}
            setIsSaveButtonEnabled={setIsSaveButtonEnabled}
            postNewData={postNewData}
          />
        </div>
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
