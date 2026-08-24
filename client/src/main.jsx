import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
import InputDeviceProvider from './contexts/inputDevice/InputDeviceProvider.jsx'
import { MotionConfig } from "framer-motion";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion={import.meta.env.DEV ? "never" : "user"}>
      <InputDeviceProvider>
        <RouterProvider router={router}/>
      </InputDeviceProvider>
    </MotionConfig>
  </StrictMode>,
)
