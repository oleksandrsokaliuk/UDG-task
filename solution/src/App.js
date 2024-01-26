import { useEffect, useState } from "react";
import "./App.css";
import { usePapaParse } from "react-papaparse";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import Table from "./components/Table";
import ChartPie from "./components/Chart";
import CriteriaSelect from "./components/CriteriaSelect";

function App() {
  const { readString, jsonToCSV } = usePapaParse();
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
  const postNewData = async () => {
    const jsonString = JSON.stringify(csvData.data);
    const dataCSV = jsonToCSV(jsonString);
    console.log({ dataCSV });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}${process.env.REACT_APP_SERVER_PORT}/`,
        { data: jsonString }
      );
      console.log({ response });
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

  const [selectedCriteria, setSelectedCriteria] = useState();
  const [isPopupVisible, setPopupVisible] = useState(false);
  useEffect(() => {
    console.log({ selectedCriteria });
  }, [selectedCriteria]);

  return (
    <>
      <div className="header-container">
        <header>
          <h1>Probeaufgabe 1 - CSV Verarbeitung</h1>
          <h2>Oleksandr Sokaliuk</h2>
        </header>
        {csvData && (
          <Table
            tableData={csvData}
            setCsvData={setCsvData}
            itemsPerPage={10}
            postNewData={postNewData}
            csvData={csvData}
          />
        )}
        {csvData && (
          <CriteriaSelect
            criteria={csvData.data[0]}
            setSelectedCriteria={setSelectedCriteria}
            selectedCriteria={selectedCriteria}
            isPopupVisible={isPopupVisible}
            setPopupVisible={setPopupVisible}
          />
        )}
      </div>
      {csvData &&
        selectedCriteria &&
        selectedCriteria.map((criteria) => (
          <>
            <h3>{criteria}</h3>
            <ChartPie items={csvData.data} criteria={criteria} />
          </>
        ))}
    </>
  );
}

export default App;
