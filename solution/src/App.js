import { useEffect, useState } from "react";
import "./App.css";
import { usePapaParse } from "react-papaparse";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import Table from "./components/Table";
import ChartPie from "./components/Chart";

function App() {
  const { readString, unparse } = usePapaParse();
  const [csvData, setCsvData] = useState(undefined);
  const getDataFromFile = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}${process.env.REACT_APP_SERVER_PORT}/`
      );
      readString(response.data, {
        worker: true,
        complete: (results) => {
          setCsvData(results);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDataFromFile();
  }, []);

  useEffect(() => {
    console.log({ csvData });
  }, [csvData]);

  return (
    <>
      {/* <Pie
  data={...}
/> */}
      {csvData !== undefined && (
        <Table tableData={csvData} setCsvData={setCsvData} itemsPerPage={10} />
      )}
      {csvData && <ChartPie clothes={csvData} />}
    </>
  );
}

export default App;
