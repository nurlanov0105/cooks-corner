import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import classNames from 'classnames';

const NotFound = () => {
   return (
      <main className={styles.main}>
         <div className={styles.block}>
            <h2 className={styles.block__title}>There is no page. Eror 404</h2>
            <Link to='/' className={classNames('h2', styles.block__subtitle)}>
               Go to Home page
            </Link>
         </div>
      </main>
   );
};

export default NotFound;
