import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const TableItems = ({
  currentItems,
  setCsvData,
  setIsSaveButtonEnabled,
  itemOffset,
}) => {
  return (
    <>
      {currentItems &&
        currentItems.map((row, idx) => (
          <tr key={`${row[0]}`}>
            {row.map((str, index) => {
              return (
                <td key={`${str}_${row[1]}_${index}`}>
                  <input
                    type="text"
                    defaultValue={str}
                    onBlur={(e) => {
                      setCsvData((prevData) => {
                        const newData = [...prevData.data];
                        newData[idx + 1] = [...newData[idx + 1]];
                        newData[idx + 1][index] = e.target.value;

                        return { data: newData };
                      });
                    }}
                  />
                </td>
              );
            })}
            <button
              className="btn-delete"
              onClick={() => {
                console.log({ number: itemOffset + idx });
                setCsvData((prevData) => {
                  console.log({ prevData: prevData.data });
                  const newItems = [...prevData.data];
                  newItems.splice(itemOffset + 1 + idx, 1);
                  return { data: newItems };
                });
              }}
            >
              <MdDelete />
            </button>
          </tr>
        ))}
    </>
  );
};

export default TableItems;
