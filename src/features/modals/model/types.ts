export interface FormData {
   dto: {
      name: string;
      bio: string;
   };
   image?: File | null;
}

export interface IIngredient {
   ingredient: string;
   amount: string;
   measureUnit: string;
}
