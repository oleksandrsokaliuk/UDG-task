import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";

const ChartPie = ({ clothes }) => {
  const getRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  };

  const [backgroundColors, setBackgroundColors] = useState(() =>
    Array.from({ length: clothes.data.length - 1 }, getRandomColor)
  );

  useEffect(() => {
    setBackgroundColors((prevColors) =>
      Array.from(
        { length: clothes.data.length - 1 },
        (_, index) => prevColors[index] || getRandomColor()
      )
    );
  }, [clothes.data.length]);

  const genders = clothes.data.slice(1).map((item) => item[5]); // тут принимается как раз критерий Geschlecht
  const uniqueGenders = [...new Set(genders)];

  const genderData = uniqueGenders.map((gender) => {
    const genderWithoutUndefined = genders.map((gendParent) =>
      gendParent === undefined ? "" : gendParent
    );
    const count = genders
      .map((gendParent) => (gendParent === undefined ? "" : gendParent))
      .filter((g) => g === gender).length;

    return { genderWithoutUndefined, count };
  });

  const replaceEmpty = (value) =>
    value !== undefined && value !== "" ? value : "Nicht angegeben";

  return (
    <Pie
      data={{
        labels: [...new Set(uniqueGenders.map(replaceEmpty))],
        datasets: [
          {
            label: "Количество товаров по полу",
            data: genderData.map((item) => item.count),
            backgroundColor: backgroundColors,
          },
        ],
      }}
    />
  );
};

export default ChartPie;
