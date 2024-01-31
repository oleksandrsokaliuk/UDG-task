import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const TableItems = ({ currentItems, setCsvData, itemOffset }) => {
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
                        newData[itemOffset + idx + 1] = [
                          ...newData[itemOffset + idx + 1],
                        ];
                        newData[itemOffset + idx + 1][index] = e.target.value;
                        return { data: newData };
                      });
                    }}
                  />
                </td>
              );
            })}
            <td className="btn-td">
              <button
                className="btn-delete"
                onClick={() => {
                  setCsvData((prevData) => {
                    const newItems = [...prevData.data];
                    newItems.splice(itemOffset + 1 + idx, 1);
                    return { data: newItems };
                  });
                }}
              >
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
    </>
  );
};

export default TableItems;
