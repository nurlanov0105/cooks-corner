import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './appStore';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <ToastContainer
               position='top-right'
               autoClose={3000}
               closeOnClick
               theme='dark'
               pauseOnHover={false}
               draggable
            />
            <App />
         </Provider>
      </BrowserRouter>
   </React.StrictMode>
);
