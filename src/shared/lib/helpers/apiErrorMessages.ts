import { toast } from 'react-toastify';

export const apiErrorMessages = ({ queryName, error }: any) => {
   console.log(`error ${queryName} - `, error);
   toast.error(error.response.data);
};
