import Loading from './Loader_v2.gif';
import styles from './index.module.scss';

const Loader = (props) => {
  return (
    <div className={styles.loader} style={{ display: props.load ? 'flex' : 'none' }}>
      <img src={Loading} alt='' />
    </div>
  );
};

export default Loader;
