import React, { useState, useEffect } from "react";
import "chart.js/auto";
import "./styles/chart.css";
import { Pie } from "react-chartjs-2";

const ChartPie = ({ items, criteria }) => {
  const getRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  }; // funktion creates one color

  const allCriterias = items
    .slice(1)
    .map((item) => item[items[0].findIndex((element) => element === criteria)]); // finds all criterias

  const uniqueSelectedCriteria = [...new Set(allCriterias)].filter(
    (criteria) => criteria !== undefined && criteria !== ""
  ); // finds all uniq criterias

  const getColorsForEach = () =>
    uniqueSelectedCriteria.map(() => getRandomColor());

  const [diagrammColors, setDiagrammColors] = useState(); // gets uniq color for each criteria

  const uniq = items && items[0].findIndex((el) => el === criteria);

  const [itemsQuantity, setItemsQuantity] = useState([]);
  const [itemPercents, setItemsPercents] = useState([]);

  const calculateQuantity = () => {
    const quantity = uniqueSelectedCriteria.map(
      (uniqCriteria) =>
        items.filter((element) => uniqCriteria === element[uniq]).length
    );
    setItemsQuantity(quantity);
  }; // defines quantity of all elements according to each criteria

  useEffect(() => {
    calculateQuantity();
    setDiagrammColors(() => getColorsForEach());
  }, [criteria, items]);

  const calculatePercents = () => {
    const percents = itemsQuantity.map((num) =>
      (
        (num * 100) /
        itemsQuantity.reduce((partialSum, a) => partialSum + a, 0)
      ).toFixed(2)
    );
    setItemsPercents(percents);
  };

  useEffect(() => {
    calculatePercents();
  }, [itemsQuantity]);

  return (
    <Pie
      data={{
        labels: uniqueSelectedCriteria.map((label) => label),
        datasets: [
          {
            label: `Anzahl der Artikel nach ${criteria}`,
            data: itemsQuantity.map((item) => item),
            backgroundColor: diagrammColors,
          },
          {
            label: `Prozentsatz der Artikel nach ${criteria}`,
            data: itemPercents.map((item) => item),
            backgroundColor: diagrammColors,
          },
        ],
      }}
    />
  );
};

export default ChartPie;
