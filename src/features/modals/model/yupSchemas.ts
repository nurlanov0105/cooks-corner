import * as Yup from 'yup';

export const profileValidationSchema = Yup.object({
   name: Yup.string(), // это поле обязательно
   bio: Yup.string(), // это поле обязательно
});

export const recipeValidationSchema = Yup.object({
   recipe: Yup.string().required(),
   description: Yup.string().required(),
   time: Yup.string().required(),
});
