const SaveTableButton = ({ postNewData, isBtnLabelSaved }) => {
  return (
    <button
      className={`btn save-btn ${isBtnLabelSaved && "isBtnLabel"}`}
      onClick={() => {
        postNewData();
      }}
    >
      {isBtnLabelSaved ? "Gespeichert" : "Speichern"}
    </button>
  );
};

export default SaveTableButton;
