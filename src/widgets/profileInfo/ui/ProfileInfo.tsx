import { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface Props {
   image: string;
}

const ProfileInfo: FC<Props> = ({ image }) => {
   return (
      <div className={styles.profile}>
         <div className={styles.profile__img} style={{ backgroundImage: `url(${image})` }}></div>
         <div className={styles.profile__body}>
            <div className={styles.profile__social}>
               <div className={styles.profile__box}>
                  <span className={styles.profile__amount}>29</span>
                  <span className={styles.profile__explain}>Recipe</span>
               </div>
               <div className={styles.profile__box}>
                  <span className={styles.profile__amount}>144</span>
                  <span className={styles.profile__explain}>Followers</span>
               </div>
               <div className={styles.profile__box}>
                  <span className={styles.profile__amount}>100</span>
                  <span className={styles.profile__explain}>Following</span>
               </div>
            </div>
            <h4 className={styles.profile__title}>Sarthak Ranjan Hota</h4>
            <div className={styles.profile__about}>
               I'm a passionate chef who loves creating delicious dishes with flair.
            </div>
            <button className={classNames('btn', styles.profile__btn)}>
               <span>Manage Profile</span>
            </button>
         </div>
      </div>
   );
};

export default ProfileInfo;
