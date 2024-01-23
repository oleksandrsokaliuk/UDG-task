import { useEffect } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";

const ChartPie = ({ clothes }) => {
  console.log({ data: clothes.data });
  const getRandomColor = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    return randomColor;
  };

  const genders = clothes.data.slice(1).map((item) => item[5]);
  const uniqueGenders = [...new Set(genders)];
  console.log({ uniqueGenders });

  const genderData = uniqueGenders.map((gender) => {
    // console.log({
    //   gendration: genders.map((gendParent) =>
    //     gendParent === undefined ? "" : gendParent
    //   ),
    // });
    const genderWithoutUndefined = genders.map((gendParent) =>
      gendParent === undefined ? "" : gendParent
    );
    const count = genders
      .map((gendParent) => (gendParent === undefined ? "" : gendParent))
      .filter((g) => g === gender).length;
    // const count = genders.map((gend => )).filter((g) => g === gender).length;

    return { genderWithoutUndefined, count };
  });
  console.log({
    test: uniqueGenders.map((gender) => {
      return genders.filter((g) => g === gender);
    }),
  });

  const replaceEmpty = (value) =>
    value !== undefined && value !== "" ? value : "Nicht angegeben";

  const backgroundColors = genderData.map(() => getRandomColor());
  console.log({ test2: uniqueGenders.map(replaceEmpty) });
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
