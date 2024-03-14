import classNames from 'classnames';
import styles from './styles.module.scss';
import { CloseModalBtn } from '@/entities/closeModalBtn';

import arrowDownIcon from '@/shared/assets/imgs/modals/arrow-down.svg';
import plusIcon from '@/shared/assets/imgs/modals/plus.svg';
import { useState } from 'react';
import { useFormik } from 'formik';
import { recipeValidationSchema } from '../../model/yupSchemas';

const RecipeModal = () => {
   const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
   const [selectedCategory, setSelectedCategory] = useState('Breakfast');
   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
   const [isIngredientOpen, setIsIngredientOpen] = useState(false);
   const [selectedFile, setSelectedFile] = useState<any>(null);
   const [selectedWeight, setSelectedWeight] = useState('0');
   const [ingredients, setIngredients] = useState([]);

   const levelCategories = ['Easy', 'Medium', 'Hard'];
   const mealCategories = ['Breakfast', 'Lunch', 'Dinner'];
   const weightCategories = ['0', '3', '5'];

   const formik = useFormik({
      initialValues: {
         recipe: '',
         description: '',
         ingredient: '',
      },
      validationSchema: recipeValidationSchema,
      onSubmit: (values) => {
         console.log(values);
      },
   });

   const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
         setSelectedFile(URL.createObjectURL(event.target.files[0]));
      }
   };

   const handleDifficultyChange = (difficulty: string) => {
      setSelectedDifficulty(difficulty);
   };

   const handleCategoryChange = (category: string) => {
      setSelectedCategory(category);
      setIsCategoryOpen(false);
   };

   // const handleIngredientChange = (ingredient: string) => {
   //    formik.setFieldValue('ingredient', ingredient);
   //    setIsIngredientOpen(false);
   // };

   const handleWeightChange = (weight: string) => {
      setSelectedWeight(weight);
      setIsIngredientOpen(false);
   };

   const addIngredient = () => {
      // @ts-ignore
      setIngredients([...ingredients, formik.values.ingredient]);
      formik.setFieldValue('ingredient', '');
   };

   return (
      <div className={styles.wrapper}>
         <h2 className={classNames('h2', styles.wrapper__title)}>Create recipe</h2>
         <CloseModalBtn />
         <form className={styles.form}>
            <div className={styles.form__group}>
               <label htmlFor='photo' className={styles.form__label}>
                  Add a recipe photo
               </label>
               <div className={styles.form__fileUpload}>
                  {selectedFile && (
                     <img src={selectedFile} className={styles.form__uploadImg} alt='Selected' />
                  )}
                  <input
                     type='file'
                     id='photo'
                     accept='image/*'
                     className={styles.form__fileInput}
                     onChange={onFileChange}
                  />
                  <label
                     htmlFor='photo'
                     className={classNames(
                        styles.form__labelUpload,
                        selectedFile ? styles.form__labelUpload_active : ''
                     )}>
                     Change photo
                  </label>
               </div>
            </div>
            <div className={styles.form__group}>
               <label htmlFor='recipe' className={styles.form__label}>
                  Name your recipe
               </label>
               <input
                  type='text'
                  id='recipe'
                  className={styles.form__input}
                  placeholder='Name your recipe'
               />
            </div>
            <div className={styles.form__group}>
               <label htmlFor='description' className={styles.form__label}>
                  Add a description
               </label>
               <textarea
                  id='description'
                  className={classNames(styles.form__input, styles.form__textarea)}
                  placeholder='Description'></textarea>
            </div>
            <div className={styles.form__group}>
               <label htmlFor='ingredient' className={styles.form__label}>
                  Add an ingredient
               </label>
               <div className={styles.form__row}>
                  <input
                     type='text'
                     id='ingredient'
                     className={styles.form__input}
                     placeholder='Ingredient name'
                     value={formik.values.ingredient}
                     onChange={formik.handleChange}
                  />
                  <div
                     className={styles.form__select}
                     onClick={() => setIsIngredientOpen(!isIngredientOpen)}>
                     <div className={styles.form__selected}>
                        <input
                           type='text'
                           className={styles.form__inputCount}
                           value={selectedWeight}
                           readOnly
                        />
                        <span className={styles.form__thin}>kg</span>
                        <img src={arrowDownIcon} alt='arrow down icon' />
                     </div>
                     {isIngredientOpen && (
                        <ul className={styles.form__list}>
                           {weightCategories.map((weight) => (
                              <li
                                 key={weight}
                                 className={styles.form__item}
                                 onClick={() => handleWeightChange(weight)}>
                                 {weight}
                              </li>
                           ))}
                        </ul>
                     )}
                  </div>
                  <img
                     src={plusIcon}
                     alt='add icon'
                     className={styles.form__add}
                     onClick={addIngredient}
                  />
               </div>
               {ingredients.map((ingredient, index) => (
                  <div key={index}>{ingredient}</div>
               ))}
            </div>
            <div className={styles.form__group}>
               <label className={styles.form__label}>Difficulty</label>
               <div className={styles.form__btns}>
                  {levelCategories.map((difficulty) => (
                     <button
                        type='button'
                        key={difficulty}
                        className={classNames(
                           styles.form__btnRadio,
                           selectedDifficulty === difficulty ? styles.form__btnRadio_active : ''
                        )}
                        onClick={() => handleDifficultyChange(difficulty)}>
                        {difficulty}
                     </button>
                  ))}
               </div>
            </div>
            <div className={styles.form__group}>
               <span className={styles.form__label}>Category of meal</span>
               <div
                  className={styles.form__categorySelect}
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                  <div className={styles.form__categorySelected}>
                     <span>{selectedCategory}</span>
                     <img src={arrowDownIcon} alt='arrow icon' />
                  </div>
                  {isCategoryOpen && (
                     <ul className={classNames(styles.form__categoryList)}>
                        {mealCategories.map((category) => (
                           <li key={category} onClick={() => handleCategoryChange(category)}>
                              {category}
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
            </div>
            <div className={styles.form__group}>
               <label htmlFor='time' className={styles.form__label}>
                  Preparation time
               </label>
               <input
                  type='text'
                  id='time'
                  className={styles.form__input}
                  placeholder='How much time does it need?(minutes)'
               />
            </div>
            <button
               type='submit'
               disabled={!formik.isValid || !formik.dirty}
               className={classNames('btn', styles.form__btn)}>
               <span>Create a recipe</span>
            </button>
         </form>
      </div>
   );
};

export default RecipeModal;
