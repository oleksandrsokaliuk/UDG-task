import { useEffect, useState } from "react";

const TableItems = ({
  currentItems,
  setCsvData,
  setIsSaveButtonEnabled,
  itemOffset,
}) => {
  const areArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };
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
                        console.log({
                          areEqual:
                            JSON.stringify(prevData.data) ===
                            JSON.stringify(newData),
                        });
                        console.log({ newData });
                        console.log({ prevData: prevData.data });
                        JSON.stringify(prevData.data) !==
                          JSON.stringify(newData) &&
                          setIsSaveButtonEnabled(true);
                        return { data: newData };
                      });
                    }}
                  />
                </td>
              );
            })}
            <button
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
              Delete
            </button>
          </tr>
        ))}
    </>
  );
};

export default TableItems;
