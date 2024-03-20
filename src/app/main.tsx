import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './appStore';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
   defaultOptions: { queries: { staleTime: 60000, gcTime: 10 * (60 * 1000) } },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
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
         </QueryClientProvider>
      </BrowserRouter>
   </React.StrictMode>
);
