export const handleLikenBookmark = async (
   isItem: boolean,
   setLocalItem: Function,
   item: Function,
   removeItem: Function,

   dispatch: any,
   showModal: any,
   isAuth: boolean,
   toast: any,
   recipeId: number,

   count?: number,
   setCount?: Function
) => {
   if (!isAuth) {
      dispatch(showModal('NotAuthNotice'));
      return;
   }
   setLocalItem(!isItem);
   if (setCount && count) {
      setCount(count + (!isItem ? 1 : -1));
   }
   try {
      const response: any = !isItem ? await item({ recipeId }) : await removeItem({ recipeId });
      if (response.error) {
         console.log(response.error);
         toast.error('error');
         setLocalItem(isItem);
      }
   } catch (error) {
      console.log(error);
      setLocalItem(isItem);
   }
};
