import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { ManageProfileModal } from '@/features/modals';
import { EmailNoticeModal } from '@/features/modals';
import { NotAuthNotice } from '@/features/modals';
import { RecipeModal } from '@/features/modals';
import { closeModal } from '..';
import { LogoutModal } from '@/features/modals';

import classNames from 'classnames';
import styles from './styles.module.scss';

const Modal: FC = () => {
   const dispatch = useAppDispatch();
   const { isOpen, componentName } = useAppSelector((state) => state.modal);

   const onCloseModal = () => {
      dispatch(closeModal());
   };
   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

   const componentsLookUp = {
      LogoutModal,
      ManageProfileModal,
      RecipeModal,
      EmailNoticeModal,
      NotAuthNotice,
   };
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
