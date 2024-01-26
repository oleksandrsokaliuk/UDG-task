import React, { useState, useEffect } from "react";
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
    .map((item) => item[items[0].findIndex((element) => element === criteria)]); // тут принимается как раз критерий Geschlecht
  const uniqueSelectedCriteria = [...new Set(selectedCriteria)];

  const selectedCriteriasItems = uniqueSelectedCriteria.map((gender) => {
    const genderWithoutUndefined = selectedCriteria.map((gendParent) =>
      gendParent === undefined ? "" : gendParent
    );
    const count = selectedCriteria
      .map((gendParent) => (gendParent === undefined ? "" : gendParent))
      .filter((g) => g === gender).length;

    return { genderWithoutUndefined, count };
  });

  const replaceEmpty = (value) =>
    value !== undefined && value !== "" ? value : "Nicht angegeben";

  const percentageData = selectedCriteriasItems.map((item) => {
    const total = selectedCriteriasItems.reduce(
      (acc, curr) => acc + curr.count,
      0
    );
    const percentage = ((item.count / total) * 100).toFixed(2);
    return `${item.count} (${percentage}%)`;
  });

  return (
    <Pie
      // plugins={[ChartDataLabels]}
      data={{
        labels: [...new Set(uniqueSelectedCriteria.map(replaceEmpty))],
        datasets: [
          {
            label: `Anzahl der Artikel nach ${criteria}`,
            data: selectedCriteriasItems.map((item) => item.count),
            backgroundColor: backgroundColors,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              },
              color: "red",
            },
          },
        },
        // tooltips: {
        //   callbacks: {
        //     label: function (tooltipItem, data) {
        //       var dataset = data.datasets[tooltipItem.datasetIndex];
        //       var meta = dataset._meta[Object.keys(dataset._meta)[0]];
        //       var total = meta.total;
        //       var currentValue = dataset.data[tooltipItem.index];
        //       var percentage = parseFloat(
        //         ((currentValue / total) * 100).toFixed(1)
        //       );
        //       return currentValue + " (" + percentage + "%)";
        //     },
        //     title: function (tooltipItem, data) {
        //       return data.labels[tooltipItem[0].index];
        //     },
        //   },
        // },
      }}
    />
  );
};
export default ChartPie;
