import "./styles/criteria-select.css";

const CriteriaSelect = ({
  criteria,
  setSelectedCriteria,
  selectedCriteria,
  isPopupVisible,
  setPopupVisible,
}) => {
  return (
    <>
      <button
        className="dgrm-label"
        for="criteria"
        onClick={() =>
          setPopupVisible((prevState) => (!prevState ? true : false))
        }
      >
        Diagramm(e) erstellen
      </button>
      <div
        className={`criteria-container ${
          isPopupVisible ? "criteria-visible" : "criteria-hidden"
        }`}
      >
        <h3>Wählen Sie die Kriterien</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const selectedElements = Array.from(e.target.elements)
              .filter((element) => element.checked)
              .map((element) => element.name);
            setSelectedCriteria(selectedElements);
            setPopupVisible(false);
          }}
        >
          <div className="checkbox-container">
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
              return (
                <>
                  <input
                    value={element}
                    type="checkbox"
                    name={element}
                    id={element}
                    key={element}
                  />
                  <label htmlFor={element}> {element}</label>
                </>
              );
            })}
          </div>
          <input type="submit" value="Erstellen" />
        </form>
      </div>
      {/* <select
        name="criteria"
        id="criteria"
        value={selectedCriteria}
        onChange={(e) => setSelectedCriteria(e.target.value)}
      >
        <option selected="selected">{"<--select criteria-->"}</option>
        
      </select> */}
    </>
  );
};

export default CriteriaSelect;
