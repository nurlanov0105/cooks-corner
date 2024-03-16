import { useAppSelector } from '@/app/appStore';

import { NotAuthNotice } from '@/features/modals';
import classNames from 'classnames';
import styles from './styles.module.scss';

const ModalBlur = () => {
   // const dispatch = useAppDispatch();
   const { isOpen, componentName } = useAppSelector((state) => state.modalBlur);

   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

   const componentsLookUp = { NotAuthNotice };
   let RenderComponent;
   if (componentName) {
      const SelectedComponent = componentsLookUp[componentName] as React.ElementType;

      if (SelectedComponent) {
         RenderComponent = <SelectedComponent />;
      }
   }

   return (
      <div className={classNames(styles.modal, isOpen ? styles.active : '')}>
         <div className={styles.content} onClick={handleClick}>
            {RenderComponent}
         </div>
      </div>
   );
};

export default ModalBlur;
