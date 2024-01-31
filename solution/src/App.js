import { useEffect, useState } from "react";
import "./App.css";
import { usePapaParse } from "react-papaparse";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import Table from "./components/Table";
import ChartPie from "./components/Chart";
import CriteriaSelect from "./components/CriteriaSelect";
import Loader from "./components/Loader";

function App() {
  const { readString, jsonToCSV } = usePapaParse();
  const [csvData, setCsvData] = useState(undefined);
  const [isResponseSuccess, setIsResponseSuccess] = useState(true);
  const [isBtnLabelSaved, setIsBtnLabelSaved] = useState(false);
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
    setIsResponseSuccess(false);
    const jsonString = JSON.stringify(csvData.data);
    const dataCSV = jsonToCSV(jsonString);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}${process.env.REACT_APP_SERVER_PORT}/`,
        { data: dataCSV }
      );
      response.status === 200 && setIsResponseSuccess(true);
      response.status === 200 && setIsBtnLabelSaved(true);
      setTimeout(() => setIsBtnLabelSaved(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDataFromFile();
  }, []);

  const [selectedCriteria, setSelectedCriteria] = useState();
  const [isPopupVisible, setPopupVisible] = useState(false);

  return (
    <>
      <div className="header-container">
        <header>
          <h1>Probeaufgabe 1 - CSV Verarbeitung</h1>
          <h2>Oleksandr Sokaliuk</h2>
        </header>
        {csvData ? (
          <Table
            tableData={csvData}
            setCsvData={setCsvData}
            itemsPerPage={10}
            postNewData={postNewData}
            csvData={csvData}
            isResponseSuccess={isResponseSuccess}
            isBtnLabelSaved={isBtnLabelSaved}
          />
        ) : (
          <Loader />
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
      {csvData && selectedCriteria && (
        <div className="charts-container">
          {selectedCriteria.map((criteria) => (
            <div className="chart-container" key={criteria}>
              <h3>{criteria}</h3>
              <ChartPie items={csvData.data} criteria={criteria} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
