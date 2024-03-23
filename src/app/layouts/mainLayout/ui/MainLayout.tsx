import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '@/widgets/navbar';
import styles from './styles.module.scss';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { setCurrentPage } from '@/entities/user';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
   const location = useLocation();
   const wrapperRef = useRef<HTMLDivElement>(null);
   const [, setIsProfilePage] = useState(false);
   const dispatch = useAppDispatch();
   const { currentPage } = useAppSelector((state) => state.user);

   const handleScroll = useCallback(() => {
      if (wrapperRef.current) {
         const { scrollTop, scrollHeight, clientHeight } = wrapperRef.current;
         const isBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

         if (isBottom) {
            dispatch(setCurrentPage(currentPage + 1));
            console.log('Reached the bottom');
         }
      }
   }, []);

   // @ts-ignore
   useEffect(() => {
      if (location.pathname === '/profile') {
         setIsProfilePage(true);
         wrapperRef.current && wrapperRef.current.addEventListener('scroll', handleScroll);
      }
      wrapperRef.current && wrapperRef.current.scrollTo(0, 0);
      return () =>
         wrapperRef.current && wrapperRef.current.removeEventListener('scroll', handleScroll);
   }, [location.pathname]);

   return (
      <main className={styles.main}>
         <Navbar />
         <div ref={wrapperRef} className={styles.wrapper}>
            {children}
         </div>
      </main>
   );
};

export default MainLayout;
