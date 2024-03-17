import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '@/app/appStore';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.module.scss';

import { closeModal, showModal } from '@/widgets/modal';
import { useAuth } from '@/shared/lib/hooks';

const Navbar: FC = () => {
   const dispatch = useAppDispatch();
   const { isAuth } = useAuth();

   const navBtns = [
      { name: 'home', path: '/' },
      { name: 'search', path: '/search' },
      { name: 'profile', path: '/profile' },
   ];
   const [btnSelected, setBtnSelected] = useState('home');

   const navigate = useNavigate();
   const pathname = useLocation().pathname;

   useEffect(() => {
      const currentBtn = navBtns.find((btn) => btn.path === location.pathname);
      if (currentBtn) {
         setBtnSelected(currentBtn.name);
      }
   }, [location, navBtns]);

   const onBtnClick = (item: any) => {
      setBtnSelected(item.name);
      if (!isAuth && item.path === '/profile') {
         dispatch(showModal('NotAuthNotice'));
         return;
      }
      dispatch(closeModal());
      navigate(item.path);
   };

   const onLoginClick = () => {
      dispatch(closeModal());
      navigate('/signin');
   };
   const onLogoutClick = () => {
      dispatch(showModal('LogoutModal'));
   };

   return (
      <nav className={styles.navbar}>
         <div className={styles.navbar__top}>
            <svg
               className={classNames(
                  styles.navbar__logo,
                  navBtns.map((item) => (pathname === item.path ? styles.navbar__logo_active : ''))
               )}>
               <g>
                  <path d='M17.5767 26.3564C16.1024 26.3564 14.8492 25.8404 13.8172 24.8084C12.7852 23.7764 12.2692 22.5232 12.2692 21.0489V15.7413C12.2692 15.2401 12.4387 14.8199 12.7778 14.4808C13.1169 14.1417 13.5371 13.9722 14.0384 13.9722H35.3128C35.4602 12.9991 35.8583 12.1293 36.507 11.3626C37.1557 10.596 37.9518 10.0505 38.8954 9.72613L45.3971 7.55888C45.8689 7.41145 46.3259 7.44094 46.7682 7.64734C47.2105 7.85374 47.5054 8.19284 47.6528 8.66462C47.8003 9.1364 47.7634 9.59344 47.5423 10.0357C47.3211 10.478 46.9746 10.7729 46.5029 10.9203L40.0011 13.0876C39.6473 13.2055 39.3598 13.4193 39.1386 13.7289C38.9175 14.0385 38.8069 14.385 38.8069 14.7683V21.0489C38.8069 22.5232 38.2909 23.7764 37.2589 24.8084C36.2269 25.8404 34.9737 26.3564 33.4994 26.3564H17.5767ZM22.8843 35.2024V31.664H12.2692C11.7679 31.664 11.3477 31.4944 11.0086 31.1553C10.6695 30.8163 10.5 30.3961 10.5 29.8948C10.5 29.3935 10.6695 28.9734 11.0086 28.6343C11.3477 28.2952 11.7679 28.1256 12.2692 28.1256H22.8843C23.8573 28.1256 24.6903 28.4721 25.3832 29.165C26.0762 29.858 26.4226 30.6909 26.4226 31.664V35.2024C26.4226 35.7036 26.2531 36.1238 25.914 36.4629C25.5749 36.802 25.1547 36.9715 24.6535 36.9715C24.1522 36.9715 23.732 36.802 23.3929 36.4629C23.0538 36.1238 22.8843 35.7036 22.8843 35.2024ZM29.961 35.2024V31.664C29.961 30.6909 30.3075 29.858 31.0004 29.165C31.6933 28.4721 32.5263 28.1256 33.4994 28.1256H44.1145C44.6157 28.1256 45.0359 28.2952 45.375 28.6343C45.7141 28.9734 45.8836 29.3935 45.8836 29.8948C45.8836 30.3961 45.7141 30.8163 45.375 31.1553C45.0359 31.4944 44.6157 31.664 44.1145 31.664H33.4994V35.2024C33.4994 35.7036 33.3298 36.1238 32.9907 36.4629C32.6516 36.802 32.2315 36.9715 31.7302 36.9715C31.2289 36.9715 30.8087 36.802 30.4696 36.4629C30.1306 36.1238 29.961 35.7036 29.961 35.2024Z' />
               </g>
               <path d='M0.3108 50.8621C0.3108 50.2909 0.4424 49.7785 0.7056 49.3249C0.9744 48.8713 1.3356 48.5185 1.7892 48.2665C2.2484 48.0089 2.7496 47.8801 3.2928 47.8801C3.9144 47.8801 4.466 48.0341 4.9476 48.3421C5.4348 48.6445 5.7876 49.0757 6.006 49.6357H4.8552C4.704 49.3277 4.494 49.0981 4.2252 48.9469C3.9564 48.7957 3.6456 48.7201 3.2928 48.7201C2.9064 48.7201 2.562 48.8069 2.2596 48.9805C1.9572 49.1541 1.7192 49.4033 1.5456 49.7281C1.3776 50.0529 1.2936 50.4309 1.2936 50.8621C1.2936 51.2933 1.3776 51.6713 1.5456 51.9961C1.7192 52.3209 1.9572 52.5729 2.2596 52.7521C2.562 52.9257 2.9064 53.0125 3.2928 53.0125C3.6456 53.0125 3.9564 52.9369 4.2252 52.7857C4.494 52.6345 4.704 52.4049 4.8552 52.0969H6.006C5.7876 52.6569 5.4348 53.0881 4.9476 53.3905C4.466 53.6929 3.9144 53.8441 3.2928 53.8441C2.744 53.8441 2.2428 53.7181 1.7892 53.4661C1.3356 53.2085 0.9744 52.8529 0.7056 52.3993C0.4424 51.9457 0.3108 51.4333 0.3108 50.8621ZM9.13447 53.8693C8.69767 53.8693 8.30287 53.7713 7.95007 53.5753C7.59727 53.3737 7.32007 53.0937 7.11847 52.7353C6.91687 52.3713 6.81607 51.9513 6.81607 51.4753C6.81607 51.0049 6.91967 50.5877 7.12687 50.2237C7.33407 49.8597 7.61687 49.5797 7.97527 49.3837C8.33367 49.1877 8.73407 49.0897 9.17647 49.0897C9.61887 49.0897 10.0193 49.1877 10.3777 49.3837C10.7361 49.5797 11.0189 49.8597 11.2261 50.2237C11.4333 50.5877 11.5369 51.0049 11.5369 51.4753C11.5369 51.9457 11.4305 52.3629 11.2177 52.7269C11.0049 53.0909 10.7137 53.3737 10.3441 53.5753C9.98007 53.7713 9.57687 53.8693 9.13447 53.8693ZM9.13447 53.0377C9.38087 53.0377 9.61047 52.9789 9.82327 52.8613C10.0417 52.7437 10.2181 52.5673 10.3525 52.3321C10.4869 52.0969 10.5541 51.8113 10.5541 51.4753C10.5541 51.1393 10.4897 50.8565 10.3609 50.6269C10.2321 50.3917 10.0613 50.2153 9.84847 50.0977C9.63567 49.9801 9.40607 49.9213 9.15967 49.9213C8.91327 49.9213 8.68367 49.9801 8.47087 50.0977C8.26367 50.2153 8.09847 50.3917 7.97527 50.6269C7.85207 50.8565 7.79047 51.1393 7.79047 51.4753C7.79047 51.9737 7.91647 52.3601 8.16847 52.6345C8.42607 52.9033 8.74807 53.0377 9.13447 53.0377ZM14.4911 53.8693C14.0543 53.8693 13.6595 53.7713 13.3067 53.5753C12.9539 53.3737 12.6767 53.0937 12.4751 52.7353C12.2735 52.3713 12.1727 51.9513 12.1727 51.4753C12.1727 51.0049 12.2763 50.5877 12.4835 50.2237C12.6907 49.8597 12.9735 49.5797 13.3319 49.3837C13.6903 49.1877 14.0907 49.0897 14.5331 49.0897C14.9755 49.0897 15.3759 49.1877 15.7343 49.3837C16.0927 49.5797 16.3755 49.8597 16.5827 50.2237C16.7899 50.5877 16.8935 51.0049 16.8935 51.4753C16.8935 51.9457 16.7871 52.3629 16.5743 52.7269C16.3615 53.0909 16.0703 53.3737 15.7007 53.5753C15.3367 53.7713 14.9335 53.8693 14.4911 53.8693ZM14.4911 53.0377C14.7375 53.0377 14.9671 52.9789 15.1799 52.8613C15.3983 52.7437 15.5747 52.5673 15.7091 52.3321C15.8435 52.0969 15.9107 51.8113 15.9107 51.4753C15.9107 51.1393 15.8463 50.8565 15.7175 50.6269C15.5887 50.3917 15.4179 50.2153 15.2051 50.0977C14.9923 49.9801 14.7627 49.9213 14.5163 49.9213C14.2699 49.9213 14.0403 49.9801 13.8275 50.0977C13.6203 50.2153 13.4551 50.3917 13.3319 50.6269C13.2087 50.8565 13.1471 51.1393 13.1471 51.4753C13.1471 51.9737 13.2731 52.3601 13.5251 52.6345C13.7827 52.9033 14.1047 53.0377 14.4911 53.0377ZM19.6714 51.4837L21.805 53.7937H20.5114L18.7978 51.8029V53.7937H17.8402V47.5777H18.7978V51.1897L20.4778 49.1653H21.805L19.6714 51.4837ZM24.1713 53.8693C23.8073 53.8693 23.4797 53.8049 23.1885 53.6761C22.9029 53.5417 22.6761 53.3625 22.5081 53.1385C22.3401 52.9089 22.2505 52.6541 22.2393 52.3741H23.2305C23.2473 52.5701 23.3397 52.7353 23.5077 52.8697C23.6813 52.9985 23.8969 53.0629 24.1545 53.0629C24.4233 53.0629 24.6305 53.0125 24.7761 52.9117C24.9273 52.8053 25.0029 52.6709 25.0029 52.5085C25.0029 52.3349 24.9189 52.2061 24.7509 52.1221C24.5885 52.0381 24.3281 51.9457 23.9697 51.8449C23.6225 51.7497 23.3397 51.6573 23.1213 51.5677C22.9029 51.4781 22.7125 51.3409 22.5501 51.1561C22.3933 50.9713 22.3149 50.7277 22.3149 50.4253C22.3149 50.1789 22.3877 49.9549 22.5333 49.7533C22.6789 49.5461 22.8861 49.3837 23.1549 49.2661C23.4293 49.1485 23.7429 49.0897 24.0957 49.0897C24.6221 49.0897 25.0449 49.2241 25.3641 49.4929C25.6889 49.7561 25.8625 50.1173 25.8849 50.5765H24.9273C24.9105 50.3693 24.8265 50.2041 24.6753 50.0809C24.5241 49.9577 24.3197 49.8961 24.0621 49.8961C23.8101 49.8961 23.6169 49.9437 23.4825 50.0389C23.3481 50.1341 23.2809 50.2601 23.2809 50.4169C23.2809 50.5401 23.3257 50.6437 23.4153 50.7277C23.5049 50.8117 23.6141 50.8789 23.7429 50.9293C23.8717 50.9741 24.0621 51.0329 24.3141 51.1057C24.6501 51.1953 24.9245 51.2877 25.1373 51.3829C25.3557 51.4725 25.5433 51.6069 25.7001 51.7861C25.8569 51.9653 25.9381 52.2033 25.9437 52.5001C25.9437 52.7633 25.8709 52.9985 25.7253 53.2057C25.5797 53.4129 25.3725 53.5753 25.1037 53.6929C24.8405 53.8105 24.5297 53.8693 24.1713 53.8693ZM26.6592 50.8621C26.6592 50.2909 26.7908 49.7785 27.054 49.3249C27.3228 48.8713 27.684 48.5185 28.1376 48.2665C28.5968 48.0089 29.098 47.8801 29.6412 47.8801C30.2628 47.8801 30.8144 48.0341 31.296 48.3421C31.7832 48.6445 32.136 49.0757 32.3544 49.6357H31.2036C31.0524 49.3277 30.8424 49.0981 30.5736 48.9469C30.3048 48.7957 29.994 48.7201 29.6412 48.7201C29.2548 48.7201 28.9104 48.8069 28.608 48.9805C28.3056 49.1541 28.0676 49.4033 27.894 49.7281C27.726 50.0529 27.642 50.4309 27.642 50.8621C27.642 51.2933 27.726 51.6713 27.894 51.9961C28.0676 52.3209 28.3056 52.5729 28.608 52.7521C28.9104 52.9257 29.2548 53.0125 29.6412 53.0125C29.994 53.0125 30.3048 52.9369 30.5736 52.7857C30.8424 52.6345 31.0524 52.4049 31.2036 52.0969H32.3544C32.136 52.6569 31.7832 53.0881 31.296 53.3905C30.8144 53.6929 30.2628 53.8441 29.6412 53.8441C29.0924 53.8441 28.5912 53.7181 28.1376 53.4661C27.684 53.2085 27.3228 52.8529 27.054 52.3993C26.7908 51.9457 26.6592 51.4333 26.6592 50.8621ZM35.4829 53.8693C35.0461 53.8693 34.6513 53.7713 34.2985 53.5753C33.9457 53.3737 33.6685 53.0937 33.4669 52.7353C33.2653 52.3713 33.1645 51.9513 33.1645 51.4753C33.1645 51.0049 33.2681 50.5877 33.4753 50.2237C33.6825 49.8597 33.9653 49.5797 34.3237 49.3837C34.6821 49.1877 35.0825 49.0897 35.5249 49.0897C35.9673 49.0897 36.3677 49.1877 36.7261 49.3837C37.0845 49.5797 37.3673 49.8597 37.5745 50.2237C37.7817 50.5877 37.8853 51.0049 37.8853 51.4753C37.8853 51.9457 37.7789 52.3629 37.5661 52.7269C37.3533 53.0909 37.0621 53.3737 36.6925 53.5753C36.3285 53.7713 35.9253 53.8693 35.4829 53.8693ZM35.4829 53.0377C35.7293 53.0377 35.9589 52.9789 36.1717 52.8613C36.3901 52.7437 36.5665 52.5673 36.7009 52.3321C36.8353 52.0969 36.9025 51.8113 36.9025 51.4753C36.9025 51.1393 36.8381 50.8565 36.7093 50.6269C36.5805 50.3917 36.4097 50.2153 36.1969 50.0977C35.9841 49.9801 35.7545 49.9213 35.5081 49.9213C35.2617 49.9213 35.0321 49.9801 34.8193 50.0977C34.6121 50.2153 34.4469 50.3917 34.3237 50.6269C34.2005 50.8565 34.1389 51.1393 34.1389 51.4753C34.1389 51.9737 34.2649 52.3601 34.5169 52.6345C34.7745 52.9033 35.0965 53.0377 35.4829 53.0377ZM39.7896 49.8373C39.9296 49.6021 40.1144 49.4201 40.344 49.2913C40.5792 49.1569 40.8564 49.0897 41.1755 49.0897V50.0809H40.932C40.5568 50.0809 40.2712 50.1761 40.0752 50.3665C39.8848 50.5569 39.7896 50.8873 39.7896 51.3577V53.7937H38.832V49.1653H39.7896V49.8373ZM44.391 49.0897C44.755 49.0897 45.0798 49.1653 45.3654 49.3165C45.6566 49.4677 45.8834 49.6917 46.0458 49.9885C46.2082 50.2853 46.2894 50.6437 46.2894 51.0637V53.7937H45.3402V51.2065C45.3402 50.7921 45.2366 50.4757 45.0294 50.2573C44.8222 50.0333 44.5394 49.9213 44.181 49.9213C43.8226 49.9213 43.537 50.0333 43.3242 50.2573C43.117 50.4757 43.0134 50.7921 43.0134 51.2065V53.7937H42.0558V49.1653H43.0134V49.6945C43.1702 49.5041 43.369 49.3557 43.6098 49.2493C43.8562 49.1429 44.1166 49.0897 44.391 49.0897ZM51.7529 51.3661C51.7529 51.5397 51.7417 51.6965 51.7193 51.8365H48.1829C48.2109 52.2061 48.3481 52.5029 48.5945 52.7269C48.8409 52.9509 49.1433 53.0629 49.5017 53.0629C50.0169 53.0629 50.3809 52.8473 50.5937 52.4161H51.6269C51.4869 52.8417 51.2321 53.1917 50.8625 53.4661C50.4985 53.7349 50.0449 53.8693 49.5017 53.8693C49.0593 53.8693 48.6617 53.7713 48.3089 53.5753C47.9617 53.3737 47.6873 53.0937 47.4857 52.7353C47.2897 52.3713 47.1917 51.9513 47.1917 51.4753C47.1917 50.9993 47.2869 50.5821 47.4773 50.2237C47.6733 49.8597 47.9449 49.5797 48.2921 49.3837C48.6449 49.1877 49.0481 49.0897 49.5017 49.0897C49.9385 49.0897 50.3277 49.1849 50.6693 49.3753C51.0109 49.5657 51.2769 49.8345 51.4673 50.1817C51.6577 50.5233 51.7529 50.9181 51.7529 51.3661ZM50.7533 51.0637C50.7477 50.7109 50.6217 50.4281 50.3753 50.2153C50.1289 50.0025 49.8237 49.8961 49.4597 49.8961C49.1293 49.8961 48.8465 50.0025 48.6113 50.2153C48.3761 50.4225 48.2361 50.7053 48.1913 51.0637H50.7533ZM53.6528 49.8373C53.7928 49.6021 53.9776 49.4201 54.2072 49.2913C54.4424 49.1569 54.7196 49.0897 55.0388 49.0897V50.0809H54.7952C54.42 50.0809 54.1344 50.1761 53.9384 50.3665C53.748 50.5569 53.6528 50.8873 53.6528 51.3577V53.7937H52.6952V49.1653H53.6528V49.8373Z' />
            </svg>
         </div>
         <div className={styles.navbar__col}>
            <div className={styles.navbar__list}>
               {navBtns.map((item) => (
                  <button
                     key={item.name}
                     onClick={() => onBtnClick(item)}
                     className={classNames(
                        styles.navbar__btn,
                        item.name === btnSelected && pathname === item.path
                           ? styles.navbar__btn_active
                           : '',
                        item.name === 'search' ? styles.navbar__btn_search : ''
                     )}>
                     {item.name === 'home' ? (
                        <svg>
                           <path d='M4 19V11.625L3 12.4C2.76666 12.5667 2.51666 12.6333 2.25 12.6C1.98333 12.5667 1.76666 12.4333 1.6 12.2C1.43333 11.9667 1.36666 11.7167 1.4 11.45C1.43333 11.1833 1.55833 10.9667 1.775 10.8L4 9.1V7C4 6.71667 4.09583 6.47917 4.2875 6.2875C4.47916 6.09583 4.71666 6 5 6C5.28333 6 5.52083 6.09583 5.7125 6.2875C5.90416 6.47917 6 6.71667 6 7V7.575L10.775 3.925C10.9583 3.79167 11.1542 3.69167 11.3625 3.625C11.5708 3.55833 11.7833 3.525 12 3.525C12.2167 3.525 12.4292 3.55833 12.6375 3.625C12.8458 3.69167 13.0417 3.79167 13.225 3.925L22.225 10.8C22.4417 10.9667 22.5667 11.1833 22.6 11.45C22.6333 11.7167 22.5667 11.9667 22.4 12.2C22.2333 12.4167 22.0167 12.5417 21.75 12.575C21.4833 12.6083 21.2417 12.5417 21.025 12.375L20 11.625V19C20 19.55 19.8042 20.0208 19.4125 20.4125C19.0208 20.8042 18.55 21 18 21H13.5C13.3667 21 13.25 20.95 13.15 20.85C13.05 20.75 13 20.6333 13 20.5V16C13 15.7167 12.9042 15.4792 12.7125 15.2875C12.5208 15.0958 12.2833 15 12 15C11.7167 15 11.4792 15.0958 11.2875 15.2875C11.0958 15.4792 11 15.7167 11 16V20.5C11 20.6333 10.95 20.75 10.85 20.85C10.75 20.95 10.6333 21 10.5 21H6C5.45 21 4.97916 20.8042 4.5875 20.4125C4.19583 20.0208 4 19.55 4 19ZM5.3 5C4.91666 5 4.62083 4.84167 4.4125 4.525C4.20416 4.20833 4.19166 3.88333 4.375 3.55C4.65833 3.06667 5.02916 2.6875 5.4875 2.4125C5.94583 2.1375 6.45 2 7 2C7.18333 2 7.35833 1.95417 7.525 1.8625C7.69166 1.77083 7.81666 1.64167 7.9 1.475C7.98333 1.325 8.09583 1.20833 8.2375 1.125C8.37916 1.04167 8.54166 1 8.725 1C9.10833 1 9.4 1.15833 9.6 1.475C9.8 1.79167 9.80833 2.11667 9.625 2.45C9.34166 2.93333 8.97083 3.3125 8.5125 3.5875C8.05416 3.8625 7.55 4 7 4C6.81666 4 6.64166 4.04167 6.475 4.125C6.30833 4.20833 6.18333 4.34167 6.1 4.525C6.01666 4.675 5.90833 4.79167 5.775 4.875C5.64166 4.95833 5.48333 5 5.3 5Z' />
                        </svg>
                     ) : item.name === 'search' ? (
                        <svg>
                           <path
                              d='M9.81021 17.2584C13.9238 17.2584 17.2585 13.9237 17.2585 9.81009C17.2585 5.69652 13.9238 2.36182 9.81021 2.36182C5.69665 2.36182 2.36194 5.69652 2.36194 9.81009C2.36194 13.9237 5.69665 17.2584 9.81021 17.2584Z'
                              strokeWidth='2'
                              strokeMiterlimit='10'
                           />
                           <path
                              d='M15.2698 15.2698L21.6381 21.6381'
                              strokeWidth='2'
                              strokeMiterlimit='10'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                           />
                        </svg>
                     ) : item.name === 'profile' ? (
                        <svg>
                           //{' '}
                           <g>
                              //{' '}
                              <path d='M5.85 17.1C6.7 16.45 7.65 15.9375 8.7 15.5625C9.75 15.1875 10.85 15 12 15C13.15 15 14.25 15.1875 15.3 15.5625C16.35 15.9375 17.3 16.45 18.15 17.1C18.7333 16.4167 19.1875 15.6417 19.5125 14.775C19.8375 13.9083 20 12.9833 20 12C20 9.78333 19.2208 7.89583 17.6625 6.3375C16.1042 4.77917 14.2167 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 12.9833 4.1625 13.9083 4.4875 14.775C4.8125 15.6417 5.26667 16.4167 5.85 17.1ZM12 13C11.0167 13 10.1875 12.6625 9.5125 11.9875C8.8375 11.3125 8.5 10.4833 8.5 9.5C8.5 8.51667 8.8375 7.6875 9.5125 7.0125C10.1875 6.3375 11.0167 6 12 6C12.9833 6 13.8125 6.3375 14.4875 7.0125C15.1625 7.6875 15.5 8.51667 15.5 9.5C15.5 10.4833 15.1625 11.3125 14.4875 11.9875C13.8125 12.6625 12.9833 13 12 13ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C12.8833 20 13.7167 19.8708 14.5 19.6125C15.2833 19.3542 16 18.9833 16.65 18.5C16 18.0167 15.2833 17.6458 14.5 17.3875C13.7167 17.1292 12.8833 17 12 17C11.1167 17 10.2833 17.1292 9.5 17.3875C8.71667 17.6458 8 18.0167 7.35 18.5C8 18.9833 8.71667 19.3542 9.5 19.6125C10.2833 19.8708 11.1167 20 12 20ZM12 11C12.4333 11 12.7917 10.8583 13.075 10.575C13.3583 10.2917 13.5 9.93333 13.5 9.5C13.5 9.06667 13.3583 8.70833 13.075 8.425C12.7917 8.14167 12.4333 8 12 8C11.5667 8 11.2083 8.14167 10.925 8.425C10.6417 8.70833 10.5 9.06667 10.5 9.5C10.5 9.93333 10.6417 10.2917 10.925 10.575C11.2083 10.8583 11.5667 11 12 11Z' />
                              //{' '}
                           </g>
                        </svg>
                     ) : (
                        ''
                     )}
                  </button>
               ))}
            </div>
            {isAuth ? (
               <button
                  className={classNames(styles.navbar__btn, styles.navbar__logout)}
                  onClick={onLogoutClick}>
                  <svg>
                     <path d='M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z' />
                  </svg>
               </button>
            ) : (
               <button
                  className={classNames(styles.navbar__btn, styles.navbar__login)}
                  onClick={onLoginClick}>
                  <svg viewBox='0 0 499.1 499.1'>
                     <g>
                        <path
                           d='M0,249.6c0,9.5,7.7,17.2,17.2,17.2h327.6l-63.9,63.8c-6.7,6.7-6.7,17.6,0,24.3c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5
                           l93.1-93.1c6.7-6.7,6.7-17.6,0-24.3l-93.1-93.1c-6.7-6.7-17.6-6.7-24.3,0c-6.7,6.7-6.7,17.6,0,24.3l63.8,63.8H17.2
                           C7.7,232.5,0,240.1,0,249.6z'
                        />
                        <path
                           d='M396.4,494.2c56.7,0,102.7-46.1,102.7-102.8V107.7C499.1,51,453,4.9,396.4,4.9H112.7C56,4.9,10,51,10,107.7V166
                              c0,9.5,7.7,17.1,17.1,17.1c9.5,0,17.2-7.7,17.2-17.1v-58.3c0-37.7,30.7-68.5,68.4-68.5h283.7c37.7,0,68.4,30.7,68.4,68.5v283.7
                              c0,37.7-30.7,68.5-68.4,68.5H112.7c-37.7,0-68.4-30.7-68.4-68.5v-57.6c0-9.5-7.7-17.2-17.2-17.2S10,324.3,10,333.8v57.6
                              c0,56.7,46.1,102.8,102.7,102.8H396.4L396.4,494.2z'
                        />
                     </g>
                  </svg>
               </button>
            )}
         </div>
      </nav>
   );
};

export default Navbar;
