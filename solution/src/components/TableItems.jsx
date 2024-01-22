import { useEffect, useState } from "react";

const TableItems = ({ currentItems, setCsvData }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((row, idx) => (
          <tr key={`${row[0]}`}>
            {row.map((str, index) => {
              console.log({ indexTr: `${row[0]}` });
              console.log({ indexTd: `${str}_${row[1]}` });
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
          </tr>
        ))}
    </>
  );
};

export default TableItems;
