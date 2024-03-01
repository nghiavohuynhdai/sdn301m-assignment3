import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './view/app'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ToastContainer transition={Slide} />
  </React.StrictMode>
)
