import { CommonSection } from '@/widgets/commonSection';
import styles from './styles.module.scss';
import { Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
   const pathname = useLocation().pathname.slice(1);

   return (
      <main>
         <CommonSection pathname={pathname} />
         <section className={styles.section}>
            <Outlet />
         </section>
      </main>
   );
};

export default AuthLayout;
