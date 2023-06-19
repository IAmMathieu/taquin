import styles from './NewGame.module.css'

const NewGame = ({reset}) =>
    <div className={styles.buttonWrapper}>
        <button className={styles.newGameButton} onClick={reset}>New Game</button>
    </div>

export default NewGame
