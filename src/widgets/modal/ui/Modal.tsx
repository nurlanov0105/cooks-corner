import { useAppDispatch, useAppSelector } from '@/app/appStore';
import classNames from 'classnames';
import { closeModal } from '..';
import { LogoutModal } from '@/features/modals';

import styles from './styles.module.scss';

const Modal = () => {
   const dispatch = useAppDispatch();
   const { isOpen, componentName } = useAppSelector((state) => state.modal);

   const onCloseModal = () => {
      dispatch(closeModal());
   };
   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

   const componentsLookUp = { LogoutModal };
   let RenderComponent;
   if (componentName) {
      const SelectedComponent = componentsLookUp[componentName] as React.ElementType;

      if (SelectedComponent) {
         RenderComponent = <SelectedComponent />;
      }
   }

   return (
      <div className={classNames(styles.modal, isOpen ? styles.active : '')} onClick={onCloseModal}>
         <div className={styles.content} onClick={handleClick}>
            {RenderComponent}
         </div>
      </div>
   );
};

export default Modal;
