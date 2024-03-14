import { useAppDispatch } from '@/app/appStore';
import classNames from 'classnames';
import styles from './styles.module.scss';
import plusIcon from '@/shared/assets/imgs/search/plus.svg';
import { showModal } from '@/widgets/modal';

const AddRecipeBtn = () => {
   const dispatch = useAppDispatch();
   const onClick = () => {
      dispatch(showModal('RecipeModal'));
   };
   return (
      <div className={classNames('btn', styles.btn)} onClick={onClick}>
         <img src={plusIcon} alt='plus icon' />
         <span>Add your recipe</span>
      </div>
   );
};

export default AddRecipeBtn;
