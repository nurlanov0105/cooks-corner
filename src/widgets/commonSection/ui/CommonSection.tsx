import { getEmailFromLS } from '@/shared/lib/helpers/getEmailFromLS';
import styles from './styles.module.scss';
import { FC } from 'react';

interface Props {
   pathname: string;
}

const CommonSection: FC<Props> = ({ pathname }) => {
   const titles = [
      {
         name: 'signin',
         title: (
            <h1 className='h1'>
               Welcome Back <br />
               To <b>CooksCorner</b>
            </h1>
         ),
      },
      {
         name: 'signup',
         title: (
            <h1 className='h1'>
               Sign up for delicious <br /> <b>Discoveries!</b>
            </h1>
         ),
      },
      {
         name: 'confirm',
         title: (
            <h1 className='h1'>
               <b>Email confirmation</b>
            </h1>
         ),
      },
      {
         name: 'verification',
         title: (() => {
            const { email } = getEmailFromLS();
            const title = (
               <h1 className='h1'>
                  Sent an email with a link to complete registration <br />
                  to <b>{email ? email : 'example@gmail.com'}</b>
               </h1>
            );

            return title;
         })(),
      },
      {
         name: 'forgot-password',
         title: (
            <h1 className='h1'>
               Write the email to which the letter <br />
               <b>will be sent</b>
            </h1>
         ),
      },
      {
         name: 'reset-password',
         title: (
            <h1 className='h1'>
               Create a <b>new password</b> <br />
               and confirm
            </h1>
         ),
      },
   ];

   const readyItem = titles.find((item) => pathname === item.name);

   return <section className={styles.section}>{readyItem?.title}</section>;
};

export default CommonSection;
