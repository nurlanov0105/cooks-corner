interface IParams {
   isItem: boolean;
   setLocalItem: Function;
   item: Function;
   removeItem: Function;

   dispatch: any;
   showModal: any;
   isAuth: boolean;
   toast: any;
   recipeId: number;

   count?: number;
   setCount?: Function;
}

export const handleLikenBookmark = async (params: IParams) => {
   const {
      isItem,
      setLocalItem,
      item,
      removeItem,
      dispatch,
      showModal,
      isAuth,
      toast,
      recipeId,
      count,
      setCount,
   } = params;
   if (!isAuth) {
      dispatch(showModal('NotAuthNotice'));
      return;
   }
   setLocalItem(!isItem);
   if (setCount && (count || count === 0)) {
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
