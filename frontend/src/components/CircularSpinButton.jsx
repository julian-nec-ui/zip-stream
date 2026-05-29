
import styles from './CircularSpinButton.module.css';

const CircularSpinButton = ({ text = "Hover Me", onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.buttonText}>{text}</span>
      <div className={styles.iconContainer}>
        <svg
          className={styles.arrowIcon}
          xmlns="http://w3.org"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>
    </button>
  );
};

export default CircularSpinButton;
