interface ActionParams {
   isLocalAction: boolean;
   setLocalAction: React.Dispatch<React.SetStateAction<boolean>>;
   localCount: number;
   setLocalCount: React.Dispatch<React.SetStateAction<number>>;
   actionId: number;
   newActionId: number;
   recipeId: number;
   actionMutate: (params: any) => void;
}

export const handleActionClick = (params: ActionParams) => {
   const {
      isLocalAction,
      setLocalAction,
      localCount,
      setLocalCount,
      actionId,
      newActionId,
      recipeId,
      actionMutate,
   } = params;

   setLocalAction(!isLocalAction);
   setLocalCount(isLocalAction ? localCount - 1 : localCount + 1);

   const actionParams = {
      actionId: isLocalAction ? actionId : newActionId,
      objectTypeId: 2,
      objectId: recipeId,
   };
   actionMutate(actionParams);
};
