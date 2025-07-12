import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'; 
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { store } from './auth/store.jsx';
import router from './components/router.jsx';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      
    <RouterProvider router={router}/>
    </Provider>,
  </StrictMode>,
)
