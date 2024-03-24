import { FC, useState } from 'react';
// import { useAppDispatch } from '@/app/appStore';
import { useFormik } from 'formik';
import { recipeValidationSchema } from '../../model/yupSchemas';
// import { closeModal } from '@/widgets/modal';
import { CloseModalBtn } from '@/entities/closeModalBtn';
import { toast } from 'react-toastify';

import classNames from 'classnames';
import styles from './styles.module.scss';
import arrowDownIcon from '@/shared/assets/imgs/modals/arrow-down.svg';
import plusIcon from '@/shared/assets/imgs/modals/plus.svg';
import crossIcon from '@/shared/assets/imgs/search/cross.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addRecipe } from '@/entities/recipes';
import { Tags } from '@/shared/api';
import { useAppDispatch } from '@/app/appStore';
import { closeModal } from '@/widgets/modal';
import { IIngredient } from '../../model/types';

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

const RecipeModal: FC = () => {
   const [image, setImage] = useState<any>(null);
   const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
   const [selectedCategory, setSelectedCategory] = useState('breakfasts');
   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
   const [isIngredientOpen, setIsIngredientOpen] = useState(false);
   const [ingredients, setIngredients] = useState<any>([]);
   const [categoryActive, setCategoryActive] = useState(false);
   const [ingredientUnitActive, setIngredientUnitActive] = useState(false);

   const queryClient = useQueryClient();
   const dispatch = useAppDispatch();

   const { mutate: addRecipeMutate, isPending } = useMutation({
      mutationFn: (formData: any) => addRecipe(formData),
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: [Tags.RECIPES] });

         console.log(data);
         toast.success('Succesfully added recipe!');
         dispatch(closeModal());
      },
      onError: (error) => {
         toast.error('add recipe error');
         console.log(error);
      },
   });

   const handleRecipeAdd = async (formData: any) => {
      addRecipeMutate(formData);
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
   const { handleChange, values } = formik;

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
      setCategoryActive(true);
   };

   const handleIngredientClick = () => {
      setIsIngredientOpen(!isIngredientOpen);
   };
   const handleMeasueUnitClick = (unit: string) => {
      formik.setFieldValue('ingredientUnit', unit);
      setIsIngredientOpen(!isIngredientOpen);
      setIngredientUnitActive(true);
   };

   const addIngredient = () => {
      setIsIngredientOpen(false);

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

   const deleteIngredient = (ingredient: IIngredient) => {
      const filteredIngredients = ingredients.filter(
         (obj: any) =>
            obj.ingredient !== ingredient.ingredient ||
            obj.amount !== ingredient.amount ||
            obj.measureUnit !== ingredient.measureUnit
      );
      setIngredients([...filteredIngredients]);
   };

   const onTimeInputChange = (e: any) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value <= 1000) {
         formik.setFieldValue('time', value);
      } else if (e.target.value === '') {
         formik.setFieldValue('time', '');
      }
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
                  className={classNames(
                     styles.form__input,
                     formik.values.recipe && styles.form__input_active
                  )}
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
                  className={classNames(
                     styles.form__input,
                     styles.form__textarea,
                     formik.values.description && styles.form__input_active
                  )}
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
                     className={classNames(
                        styles.form__input,
                        styles.form__input_ingredient,
                        formik.values.ingredient && styles.form__input_active
                     )}
                     placeholder='Ingredient name'
                     value={formik.values.ingredient}
                     onChange={formik.handleChange}
                  />
                  <div
                     className={classNames(
                        styles.form__select,
                        ingredientUnitActive && styles.form__input_active
                     )}>
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
                           value={values.ingredientUnit}
                           onChange={handleChange('ingredientUnit')}
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
                  <div
                     className={classNames(
                        styles.form__categorySelected,
                        categoryActive ? styles.form__input_active : ''
                     )}>
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
                  className={classNames(
                     styles.form__input,
                     formik.values.time && styles.form__input_active
                  )}
                  placeholder='How much time does it need?(minutes)'
                  value={formik.values.time}
                  onChange={onTimeInputChange}
               />
            </div>
            <button
               type='submit'
               disabled={
                  !formik.isValid ||
                  !formik.dirty ||
                  ingredients.length === 0 ||
                  isPending ||
                  formik.values.photo === null
               }
               className={classNames('btn', styles.form__btn)}>
               {isPending ? <span>Loading...</span> : <span>Create a recipe</span>}
            </button>
         </form>
      </div>
   );
};

export default RecipeModal;
