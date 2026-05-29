import styles from './card.module.css';



const ContainerPage = () => {
  const handleClick = () => {
    alert('Hello from JavaScript!');
  };

  return (
    
        <div className={styles.card}>
          This is a highlighted paragraph.
        </div>
  );
};

export default ContainerPage;