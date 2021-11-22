const ScoreCard = ({ score, setScore, checkScore }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "400px",
        margin: "0 auto",
      }}
    >
      {Object.keys(score).map((item) => (
        <div
          key={item}
          onClick={() => checkScore(item)}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid black",
          }}
        >
          <span>{item.replaceAll("_", " ")}:</span>
          <span
            style={{
              borderLeft: "1px solid black",
              width: "2rem",
              textAlign: "center",
            }}
          >
            {score[item]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ScoreCard;
