import React, { useState, useEffect } from "react";
import "chart.js/auto";
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

  return (
    <Pie
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
    />
  );
};

export default ChartPie;
