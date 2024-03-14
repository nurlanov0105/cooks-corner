import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/widgets/navbar';
import styles from './styles.module.scss';
import { useEffect, useRef } from 'react';

const MainLayout = () => {
   const pathname = useLocation();
   const wrapperRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      wrapperRef.current && wrapperRef.current.scrollTo(0, 0);
   }, [pathname]);

   return (
      <main className={styles.main}>
         <Navbar />
         <div ref={wrapperRef} className={styles.wrapper}>
            <Outlet />
         </div>
      </main>
   );
};

export default MainLayout;
