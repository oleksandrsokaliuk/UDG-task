const SaveTableButton = ({
  isSaveButtonEnabled,
  setIsSaveButtonEnabled,
  postNewData,
}) => {
  return (
    <button
      className="btn save-btn"
      disabled={!isSaveButtonEnabled}
      onClick={() => {
        setIsSaveButtonEnabled(false);
        postNewData();
      }}
    >
      Speichern
    </button>
  );
};

export default SaveTableButton;
