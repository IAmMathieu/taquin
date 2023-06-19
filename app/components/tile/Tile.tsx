import styles from "./Tile.module.css";

const Tile = ({ number, moveTile }) => {
  const classes =
    styles["number"] +
    " " +
    (number.value === number.index + 1 ? styles["correct"] : "") +
    " " +
    (number.value === 16 ? styles["disabled"] : "") +
    " " +
    styles["slot--" + number.index];

  return (
    <div onClick={() => moveTile(number)} className={classes}>
      {number.value === 16 ? "" : number.value}
    </div>
  );
};

export default Tile;
