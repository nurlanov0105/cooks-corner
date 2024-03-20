import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { useFormik } from 'formik';
import { profileValidationSchema } from '../../model/yupSchemas';
import { CloseModalBtn } from '@/entities/closeModalBtn';
import { closeModal } from '@/widgets/modal';
import { toast } from 'react-toastify';

import classNames from 'classnames';
import styles from './styles.module.scss';
import cameraIcon from '@/shared/assets/imgs/modals/camera.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/entities/user';
import { Tags } from '@/shared/api';

const ManageProfileModal: FC = () => {
   const queryClient = useQueryClient();

   const dispatch = useAppDispatch();
   const profileData = useAppSelector((state) => state.user.profileData);

   const [image, setImage] = useState(cameraIcon);
   const [label, setLabel] = useState('Upload a new photo');
   const userId = useAppSelector((state) => state.auth.userId);

   const { mutate: updateProfileMutate } = useMutation({
      mutationFn: (formData: any) => updateProfile(formData),
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: [Tags.USERS] });
         console.log(data);
         toast.success('Succesfully update profile!');
      },
      onError: (error) => {
         toast.error('update profile error');
         console.log(error);
      },
   });

   const handleUpdateProfile = (formData: any) => {
      updateProfileMutate(formData);
   };

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         setImage(URL.createObjectURL(e.target.files[0]));
         setLabel('Change photo');
      }
   };

   const formik = useFormik({
      initialValues: {
         name: '',
         bio: '',
         photo: null,
      },
      validationSchema: profileValidationSchema,
      onSubmit: (values) => {
         const { name, bio, photo } = values;
         // Создайте новый объект для отправки на сервер
         const fields: any = { userId };

         // Добавьте только те поля, которые были изменены
         name ? (fields.name = name) : (fields.name = profileData.name);
         bio ? (fields.bio = bio) : (fields.bio = profileData.bio);

         const formData = new FormData();
         formData.append('dto', JSON.stringify(fields));
         if (photo) {
            formData.append('image', photo);
         }

         handleUpdateProfile(formData);

         dispatch(closeModal());
      },
   });

   return (
      <div className={styles.wrapper}>
         <h2 className={classNames('h2', styles.wrapper__title)}>Manage profile</h2>
         <CloseModalBtn />
         <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.form__inputGroup}>
               <label htmlFor='name' className={styles.form__label}>
                  Change your name
               </label>
               <input
                  type='text'
                  id='name'
                  className={styles.form__input}
                  {...formik.getFieldProps('name')}
               />
            </div>

            <div className={styles.form__inputGroup}>
               <label htmlFor='bio' className={styles.form__label}>
                  Change your bio
               </label>
               <textarea
                  id='bio'
                  className={styles.form__textarea}
                  {...formik.getFieldProps('bio')}
               />
            </div>

            <div className={styles.form__inputGroup}>
               <label htmlFor='photo' className={styles.form__label}>
                  Add a recipe photo
               </label>
               <div className={styles.form__fileUpload}>
                  <div
                     style={{ backgroundImage: `url(${image})` }}
                     className={
                        label === 'Upload a new photo' ? styles.form__img : styles.form__uploadImg
                     }></div>
                  <input
                     type='file'
                     id='photo'
                     accept='image/*'
                     className={styles.form__fileInput}
                     onChange={(e) => {
                        handleImageChange(e);
                        formik.setFieldValue('photo', e.target.files && e.target.files[0]);
                     }}
                  />
                  <label
                     htmlFor='photo'
                     className={classNames(
                        label === 'Upload a new photo'
                           ? styles.form__unsettedLabel
                           : styles.form__settedLabel
                     )}>
                     {label}
                  </label>
               </div>
            </div>

            <button
               type='submit'
               className={classNames('btn', styles.form__submitButton)}
               disabled={!formik.isValid || !formik.dirty}>
               <span>Сохранить изменения</span>
            </button>
         </form>
      </div>
   );
};

export default ManageProfileModal;
