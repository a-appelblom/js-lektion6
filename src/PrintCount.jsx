import Printcount2 from "./PrintCount2";

const Printcount = ({ count }) => {
  return (
    <div>
      <p style={{ fontSize: "4rem", fontWeight: "bolder" }}>{count}</p>
      <Printcount2 count={count} />
    </div>
  );
};

export default Printcount;
