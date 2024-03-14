import { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface Props {
   authorImg: string;
}

const AuthorInfo: FC<Props> = ({ authorImg }) => {
   return (
      <div className={styles.author}>
         <div className={styles.author__img} style={{ backgroundImage: `url(${authorImg})` }}></div>
         <h4 className={styles.author__title}>Ainsley Harriott</h4>
         <div className={styles.author__social}>
            <div className={styles.author__box}>
               <span className={styles.author__amount}>29</span>
               <span className={styles.author__explain}>Recipe</span>
            </div>
            <div className={styles.author__box}>
               <span className={styles.author__amount}>144</span>
               <span className={styles.author__explain}>Followers</span>
            </div>
            <div className={styles.author__box}>
               <span className={styles.author__amount}>100</span>
               <span className={styles.author__explain}>Following</span>
            </div>
         </div>
         <div className={styles.author__about}>
            Ainsley Denzil Dubriel Harriott MBE is an English chef and television presenter. He is
            known for his BBC cookinп
         </div>
         <button className={classNames('btn', styles.author__btn)}>
            <span>Follow</span>
         </button>
      </div>
   );
};

export default AuthorInfo;
