const Table = ({ tableData, setCsvData }) => {
  const { data } = tableData;
  const withoutHeader = data && data.slice(1);
  return (
    <table>
      <thead>
        <tr>
          {data && data[0].map((title, idx) => <th key={idx}>{title}</th>)}
        </tr>
      </thead>
      <tbody>
        {withoutHeader &&
          withoutHeader.map((row, idx) => (
            <tr key={idx}>
              {row.map((str, index) => (
                <td key={index}>
                  <input
                    type="text"
                    defaultValue={str}
                    onBlur={(e) => {
                      setCsvData((prevData) => {
                        // prevData.data.map((subarray, indx) => {
                        //   if (indx === idx + 1) {
                        //     return subarray.map((value, subIndx) =>
                        //       subIndx === index ? e.target.value : value
                        //     );
                        //   } else {
                        //     return subarray;
                        //   }
                        // })
                        const newData = [...prevData.data];
                        newData[idx + 1] = [...newData[idx + 1]];
                        newData[idx + 1][index] = e.target.value;
                        return { data: newData };
                      });
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
