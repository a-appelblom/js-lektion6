import { useState } from "react";
import {
  BsFillDice1Fill,
  BsFillDice2Fill,
  BsFillDice3Fill,
  BsFillDice4Fill,
  BsFillDice5Fill,
  BsFillDice6Fill,
} from "react-icons/bs";
import ScoreCard from "./ScoreCard";

const scoreCard = {
  ones: null,
  twos: null,
  threes: null,
  fours: null,
  fives: null,
  sixes: null,
  first_half: null,
  bonus: null,
  pair: null,
  two_pair: null,
  three_of_a_kind: null,
  four_of_a_kind: null,
  small_straight: null,
  large_straight: null,
  full_house: null,
  yatzy: null,
  full_sum: null,
};

const values = {
  ones: 1,
  twos: 2,
  threes: 3,
  fours: 4,
  fives: 5,
  sixes: 6,
};

function createInitialDice() {
  let dice = [];
  for (let i = 0; i < 5; i++) {
    dice.push({
      id: i,
      value: Math.floor(Math.random() * 6 + 1),
      locked: false,
    });
  }

  return dice;
}

const diceIcons = [
  <BsFillDice1Fill size="200" />,
  <BsFillDice2Fill size="200" />,
  <BsFillDice3Fill size="200" />,
  <BsFillDice4Fill size="200" />,
  <BsFillDice5Fill size="200" />,
  <BsFillDice6Fill size="200" />,
];

const Yatzy = () => {
  const [score, setScore] = useState(scoreCard);
  const [dice, setDice] = useState(createInitialDice());
  const [rolls, setRolls] = useState(1);

  const toggleLock = (toggledDie) => {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        if (die.id === toggledDie.id) {
          die = { ...die, locked: !die.locked };
        }
        return die;
      });
    });
  };
  const reroll = () => {
    if (rolls > 2) {
      return;
    }
    setDice((prevDice) => {
      return prevDice.map((die) => {
        if (!die.locked) {
          die.value = Math.floor(Math.random() * 6 + 1);
        }
        return die;
      });
    });
    setRolls((prev) => (prev += 1));
  };

  const resetRolls = () => {
    setDice(createInitialDice);
    setRolls(1);
  };

  const checkScore = (scoreType) => {
    let score = 0;
    let diceValues = dice.map((die) => die.value);
    switch (scoreType) {
      case "ones":
      case "twos":
      case "threes":
      case "fours":
      case "fives":
      case "sixes":
        score =
          diceValues.filter((value) => value === values[scoreType]).length *
          values[scoreType];
        break;
      case "first_half":
        // TODO: Implement
        break;
      case "bonus":
        // TODO implement
        break;
      case "pair":
        // TODO implement
        break;
      case "two_pair":
        // TODO implement
        break;
      case "three_of_a_kind":
        // TODO implement
        break;
      case "four_of_a_kind":
        // TODO implement
        break;
      case "small_straight":
        score =
          diceValues.sort((a, b) => a - b).join(",") === "1,2,3,4,5" ? 15 : 0;
        break;
      case "large_straight":
        score =
          diceValues.sort((a, b) => a - b).join(",") === "2,3,4,5,6" ? 20 : 0;
        break;
      case "full_house":
        // TODO implement

        break;
      case "yatzy":
        score = diceValues.find(
          (value) => diceValues.filter((v) => v === value).length === 5
        )
          ? 50
          : 0;
        break;
      case "full_sum":
        // TODO implement
        break;
      default:
        break;
    }
    console.log(score);
  };

  return (
    <div>
      <h1>Yatzy</h1>
      <button onClick={() => reroll()}>Reroll</button>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          margin: "4rem auto",
        }}
      >
        {dice.map((die, i) => (
          <button
            key={i}
            style={{
              backgroundColor: die.locked ? "green" : "white",
              border: "none",
              borderRadius: "2rem",
              padding: "1rem",
            }}
            onClick={(e) => toggleLock(die)}
          >
            {diceIcons.at(die.value - 1)}
            {/* {die.value} {JSON.stringify(die.locked)} */}
          </button>
        ))}
      </div>
      {rolls > 2 && (
        <div>
          <p>You are out of rolls</p>
          <button onClick={resetRolls}>Reset rolls</button>
        </div>
      )}
      <ScoreCard score={score} setScore={setScore} checkScore={checkScore} />
    </div>
  );
};

export default Yatzy;
