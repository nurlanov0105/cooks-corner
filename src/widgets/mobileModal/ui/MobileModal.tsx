import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/appStore';

import classNames from 'classnames';
import styles from './styles.module.scss';
import { closeMobileModal } from '..';

import { FollowsModal } from '@/features/modals';

const MobileModal: FC = () => {
   const dispatch = useAppDispatch();
   const { isOpen, componentName, name, data, isLoading } = useAppSelector(
      (state) => state.mobileModal
   );

   const onCloseMobileModal = () => {
      dispatch(closeMobileModal());
   };
   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

   const componentsLookUp = { FollowsModal };
   let RenderComponent;
   if (componentName) {
      const SelectedComponent = componentsLookUp[componentName] as React.ElementType;

      if (SelectedComponent) {
         RenderComponent = <SelectedComponent name={name} data={data} isLoading={isLoading} />;
      }
   }

   return (
      <div
         className={classNames(styles.modal, isOpen ? styles.active : '')}
         onClick={onCloseMobileModal}>
         <div className={styles.content} onClick={handleClick}>
            {RenderComponent}
         </div>
      </div>
   );
};

export default MobileModal;
