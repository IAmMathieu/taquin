import NewGame from "../new-game/NewGame";
import styles from "./Winner.module.css";

const Winner = ({ numbers, reset }) => {
  if (numbers) {
    if (!numbers.every((n) => n.value === n.index + 1)) return null;
  }

  return (
    <div className={styles.winner}>
      <p>You win!</p>
      <NewGame reset={reset} />
    </div>
  );
};

export default Winner;
