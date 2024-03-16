import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CommonSection } from '@/widgets/commonSection';
import styles from './styles.module.scss';

interface Props {
   children?: React.ReactNode;
}

const AuthLayout: FC<Props> = () => {
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
