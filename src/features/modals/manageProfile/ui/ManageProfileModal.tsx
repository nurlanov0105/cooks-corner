import classNames from 'classnames';
import styles from './styles.module.scss';
import { CloseModalBtn } from '@/entities/closeModalBtn';

import cameraIcon from '@/shared/assets/imgs/modals/camera.svg';
import { useState } from 'react';
import { useFormik } from 'formik';
import { profileValidationSchema } from '../../model/yupSchemas';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { closeModal } from '@/widgets/modal';
import { useUpdateProfileMutation } from '@/entities/profile';
import { toast } from 'react-toastify';

const ManageProfileModal = () => {
   const dispatch = useAppDispatch();
   const profileData = useAppSelector((state) => state.profile.profileData);

   const [image, setImage] = useState(cameraIcon);
   const [label, setLabel] = useState('Upload a new photo');
   const userId = useAppSelector((state) => state.auth.userId);

   const [updateProfile] = useUpdateProfileMutation();

   const handleUpdateProfile = async (formData: any) => {
      try {
         const response: any = await updateProfile({ formData });
         if (response.error) {
            console.log(response.error);
            toast.error(response.error.data);
         } else {
            console.log(response);
            toast.success('Succesfully update profile!');
         }
      } catch (error) {
         console.log(error);
         toast.error('error catch udpate profile');
      }
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
