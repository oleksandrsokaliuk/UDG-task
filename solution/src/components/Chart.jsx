import React, { useState, useEffect } from "react";
import "chart.js/auto";
import "./styles/chart.css";
import { Pie } from "react-chartjs-2";

const ChartPie = ({ items, criteria }) => {
  useEffect(() => {
    console.log({ criteriaChart: criteria });
  }, []);

  const getRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  };

  const [backgroundColors, setBackgroundColors] = useState(() =>
    Array.from({ length: items.length - 1 }, getRandomColor)
  );

  useEffect(() => {
    setBackgroundColors((prevColors) =>
      Array.from(
        { length: items.length - 1 },
        (_, index) => prevColors[index] || getRandomColor()
      )
    );
  }, [items.length]);

  const selectedCriteria = items
    .slice(1)
    .map((item) => item[items[0].findIndex((element) => element === criteria)]);

  const uniqueSelectedCriteria = [...new Set(selectedCriteria)];

  const selectedCriteriasItems = uniqueSelectedCriteria.map((gender) => {
    const genderWithoutUndefined = selectedCriteria
      .map((gendParent) => (gendParent === undefined ? "" : gendParent))
      .filter((g) => g === gender && g !== "" && g !== "Nicht angegeben");
    const count = genderWithoutUndefined.length;

    return { genderWithoutUndefined, count };
  });

  const filteredLabels = selectedCriteriasItems.map((item) =>
    item.genderWithoutUndefined.length > 0
      ? item.genderWithoutUndefined[0]
      : undefined
  );

  const filteredLabelsNotNull = filteredLabels.filter(
    (label) => label !== undefined
  );

  const replaceEmpty = (value) =>
    value !== undefined && value !== "" ? value : "Nicht angegeben";

  const total = selectedCriteriasItems.reduce(
    (acc, item) => acc + item.count,
    0
  );

  return (
    <Pie
      data={{
        labels: filteredLabelsNotNull.map((label) => replaceEmpty(label)),
        datasets: [
          {
            label: `Anzahl der Artikel nach ${criteria}`,
            data: selectedCriteriasItems.map((item) => {
              console.log({ itemQuantity: item.count });
              console.log({ selectedCriteriasItems });
              return item.count;
            }),
            backgroundColor: backgroundColors,
          },
          {
            label: "Prozentsatz",
            data: selectedCriteriasItems.map((item) =>
              ((item.count / total) * 100).toFixed(2)
            ),
            backgroundColor: backgroundColors,
          },
        ],
      }}
    />
  );
};

export default ChartPie;
