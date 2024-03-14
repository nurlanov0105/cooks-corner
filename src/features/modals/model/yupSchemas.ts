import * as Yup from 'yup';

export const profileValidationSchema = Yup.object({
   name: Yup.string().required('Required'), // это поле обязательно
   bio: Yup.string().required('Required'), // это поле обязательно
});

export const recipeValidationSchema = Yup.object({
   recipe: Yup.string().required('Required'),
   description: Yup.string().required('Required'),
   ingredient: Yup.string().required('Required'),
});
