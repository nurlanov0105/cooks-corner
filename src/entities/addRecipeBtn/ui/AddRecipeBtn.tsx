import { useAppDispatch } from '@/app/appStore';
import classNames from 'classnames';
import styles from './styles.module.scss';
import plusIcon from '@/shared/assets/imgs/search/plus.svg';
import { showModal } from '@/widgets/modal';
import { useAuth } from '@/shared/lib/hooks';

const AddRecipeBtn = () => {
   const { isAuth } = useAuth();

   const dispatch = useAppDispatch();
   const onClick = () => {
      if (!isAuth) {
         dispatch(showModal('NotAuthNotice'));
      } else {
         dispatch(showModal('RecipeModal'));
      }
   };
   return (
      <div className={classNames('btn', styles.btn)} onClick={onClick}>
         <img src={plusIcon} alt='plus icon' />
         <span>Add your recipe</span>
      </div>
   );
};

export default AddRecipeBtn;
