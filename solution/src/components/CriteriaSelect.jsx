const CriteriaSelect = ({
  criteria,
  setSelectedCriteria,
  selectedCriteria,
}) => {
  return (
    <>
      <label for="criteria">Choose a criteria to create a chart:</label>
      <select
        name="criteria"
        id="criteria"
        value={selectedCriteria}
        onChange={(e) => setSelectedCriteria(e.target.value)}
      >
        {criteria.map((element) => {
          if (
            element === "Hauptartikelnr" ||
            element === "Artikelname" ||
            element === "Beschreibung" ||
            element === "Grammatur" ||
            element === "Bildname"
          ) {
            return;
          }
          return <option value={element}>{element}</option>;
        })}
      </select>
    </>
  );
};

export default CriteriaSelect;
