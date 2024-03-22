import { useState, useEffect } from 'react';
import { formatDistanceStrict } from 'date-fns';

const useTimePassed = (dateString: string) => {
   const [timePassed, setTimePassed] = useState('');

   useEffect(() => {
      const timer = setInterval(() => {
         setTimePassed(formatDistanceStrict(new Date(dateString), new Date()));
      }, 1000);

      return () => {
         clearInterval(timer);
      };
   }, [dateString]);

   return timePassed;
};

export default useTimePassed;
