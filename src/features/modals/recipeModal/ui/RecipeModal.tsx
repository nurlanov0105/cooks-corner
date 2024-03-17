import classNames from 'classnames';
import styles from './styles.module.scss';
import { CloseModalBtn } from '@/entities/closeModalBtn';

import arrowDownIcon from '@/shared/assets/imgs/modals/arrow-down.svg';
import plusIcon from '@/shared/assets/imgs/modals/plus.svg';
import { useState } from 'react';
import { useFormik } from 'formik';
import { recipeValidationSchema } from '../../model/yupSchemas';

import crossIcon from '@/shared/assets/imgs/search/cross.svg';
import { useAppDispatch } from '@/app/appStore';
import { useAddRecipeMutation } from '@/entities/recipes';
import { toast } from 'react-toastify';
import { closeModal } from '@/widgets/modal';

const levelCategories = ['Easy', 'Medium', 'Hard'];
const measurementUnits = ['kg', 'grams', 'tablespoon', 'teaspoon', 'cup'];
const mealCategories = [
   'breakfasts',
   'main dishes',
   'seafoods',
   'beverages',
   'salads',
   'desserts',
   'soups',
];

const RecipeModal = () => {
   const [image, setImage] = useState<any>(null);
   const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
   const [selectedCategory, setSelectedCategory] = useState('breakfasts');
   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
   const [isIngredientOpen, setIsIngredientOpen] = useState(false);
   const [ingredients, setIngredients] = useState<any>([]);

   const dispatch = useAppDispatch();

   const [addRecipe] = useAddRecipeMutation();

   const handleRecipeAdd = async (formData: any) => {
      try {
         const response: any = await addRecipe({ formData });
         if (response.error) {
            console.log(response.error);
            toast.error(response.error.data);
         } else {
            console.log(response);
            toast.success('Succesfully add recipe!');
            dispatch(closeModal());
         }
      } catch (error) {
         console.log(error);
         toast.error('error catch add recipe');
      }
   };

   const formik = useFormik({
      initialValues: {
         photo: null,
         recipe: '',
         description: '',
         ingredient: '',
         ingredientAmount: '0',
         ingredientUnit: 'kg',
         time: '',
      },
      validationSchema: recipeValidationSchema,
      onSubmit: (values) => {
         const { photo, recipe, description, time } = values;

         console.log({
            title: recipe,
            description,
            ingredients,
            difficulty: selectedDifficulty,
            category: selectedCategory,
            cookingTimeMinutes: time,
         });

         const fields: any = {
            title: recipe,
            description,
            ingredients,
            difficulty: selectedDifficulty,
            category: selectedCategory,
            cookingTimeMinutes: time,
         };

         const formData = new FormData();
         formData.append('dto', JSON.stringify(fields));
         if (photo) {
            formData.append('image', photo);
         }

         handleRecipeAdd(formData);
      },
   });

   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         setImage(URL.createObjectURL(e.target.files[0]));
         formik.setFieldValue('photo', e.target.files && e.target.files[0]);
      }
   };
   const handleDifficultyChange = (difficulty: string) => {
      setSelectedDifficulty(difficulty);
   };

   const handleCategoryChange = (category: string) => {
      setSelectedCategory(category);
      setIsCategoryOpen(false);
   };

   const handleIngredientClick = () => {
      setIsIngredientOpen(!isIngredientOpen);
   };
   const handleMeasueUnitClick = (unit: string) => {
      formik.setFieldValue('ingredientUnit', unit);
      setIsIngredientOpen(!isIngredientOpen);
   };

   const addIngredient = () => {
      const newIngredient = {
         ingredient: formik.values.ingredient,
         amount: formik.values.ingredientAmount,
         measureUnit: formik.values.ingredientUnit,
      };
      setIngredients([...ingredients, newIngredient]);
      formik.setFieldValue('ingredient', '');
      formik.setFieldValue('ingredientAmount', '0');
      formik.setFieldValue('ingredientUnit', 'kg');
   };

   const deleteIngredient = (ingredient: any) => {
      const filteredIngredients = ingredients.filter(
         (obj: any) =>
            obj.ingredient !== ingredient.ingredient ||
            obj.amount !== ingredient.amount ||
            obj.measureUnit !== ingredient.measureUnit
      );
      setIngredients([...filteredIngredients]);
   };

   return (
      <div className={styles.wrapper}>
         <h2 className={classNames('h2', styles.wrapper__title)}>Create recipe</h2>
         <CloseModalBtn />
         <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.form__group}>
               <label htmlFor='photo' className={styles.form__label}>
                  Add a recipe photo
               </label>
               <div className={styles.form__fileUpload}>
                  {formik.values.photo && (
                     <img src={image} className={styles.form__uploadImg} alt='Selected' />
                  )}
                  <input
                     type='file'
                     id='photo'
                     accept='image/*'
                     required
                     className={styles.form__fileInput}
                     onChange={onFileChange}
                  />
                  <label
                     htmlFor='photo'
                     className={classNames(
                        styles.form__labelUpload,
                        formik.values.photo ? styles.form__labelUpload_active : ''
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
                  value={formik.values.recipe}
                  onChange={formik.handleChange}
               />
            </div>
            <div className={styles.form__group}>
               <label htmlFor='description' className={styles.form__label}>
                  Add a description
               </label>
               <textarea
                  id='description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className={classNames(styles.form__input, styles.form__textarea)}
                  placeholder='Description'></textarea>
            </div>
            <div className={classNames(styles.form__group, styles.form__group_100)}>
               <label htmlFor='ingredient' className={styles.form__label}>
                  Add an ingredient
               </label>
               <div className={styles.form__row}>
                  <input
                     type='text'
                     id='ingredient'
                     className={classNames(styles.form__input, styles.form__input_ingredient)}
                     placeholder='Ingredient name'
                     value={formik.values.ingredient}
                     onChange={formik.handleChange}
                  />
                  <div className={styles.form__select}>
                     <input
                        type='text'
                        id='ingredientAmount'
                        placeholder='0'
                        value={formik.values.ingredientAmount}
                        onChange={formik.handleChange}
                     />
                     <div className={styles.form__innerGroup} onClick={handleIngredientClick}>
                        <input
                           type='text'
                           placeholder='kg'
                           value={formik.values.ingredientUnit}
                           onChange={formik.handleChange}
                        />
                        <img src={arrowDownIcon} alt='icon down' />
                     </div>
                     {isIngredientOpen && (
                        <ul className={classNames(styles.form__categoryList)}>
                           {measurementUnits.map((unit) => (
                              <li key={unit} onClick={() => handleMeasueUnitClick(unit)}>
                                 {unit}
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
            </div>
            {ingredients && ingredients.length !== 0 && (
               <ul className={styles.form__addedList}>
                  {ingredients.map((ingredient: any, index: string) => (
                     <li key={ingredient.ingredient + ingredient.amount + ingredient.unit + index}>
                        <div>
                           {ingredient.ingredient} - {ingredient.amount} {ingredient.measureUnit}
                        </div>
                        <img
                           src={crossIcon}
                           alt='close item'
                           onClick={() => deleteIngredient(ingredient)}
                        />
                     </li>
                  ))}
               </ul>
            )}

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
                  type='number'
                  id='time'
                  className={styles.form__input}
                  placeholder='How much time does it need?(minutes)'
                  value={formik.values.time}
                  onChange={formik.handleChange}
               />
            </div>
            <button
               type='submit'
               disabled={
                  !formik.isValid ||
                  !formik.dirty ||
                  ingredients.length === 0 ||
                  formik.values.photo === null
               }
               className={classNames('btn', styles.form__btn)}>
               <span>Create a recipe</span>
            </button>
         </form>
      </div>
   );
};

export default RecipeModal;
