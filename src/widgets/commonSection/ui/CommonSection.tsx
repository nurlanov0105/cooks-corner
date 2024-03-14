import styles from './styles.module.scss';
import { FC } from 'react';

interface Props {
   pathname: string;
}

const CommonSection: FC<Props> = ({ pathname }) => {
   return (
      <section className={styles.section}>
         {pathname === 'signin' ? (
            <h1 className='h1'>
               Welcome Back <br />
               To <b>CooksCorner</b>
            </h1>
         ) : pathname === 'signup' ? (
            <h1 className='h1'>
               Sign up for delicious <br /> <b>Discoveries!</b>
            </h1>
         ) : pathname === 'confirm' ? (
            <h1 className='h1'>
               Success email <br />
               <b>confirm!</b>
            </h1>
         ) : (
            ''
         )}
      </section>
   );
};

export default CommonSection;
