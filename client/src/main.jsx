import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
import InputDeviceProvider from './contexts/inputDevice/InputDeviceProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InputDeviceProvider>
      <RouterProvider router={router}/>
    </InputDeviceProvider>
  </StrictMode>,
)
