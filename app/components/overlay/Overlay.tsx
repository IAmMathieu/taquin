import styles from "./Overlay.module.css";

const Overlay = ({ size }) =>
  new Array(size)
    .fill("")
    .map((_, i) => <div key={i} className={styles.overlay} />);

export default Overlay;
