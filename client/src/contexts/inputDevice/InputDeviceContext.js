/**
 * Input Device Context 
 * 
 * Used to keep track of what input device the user is currently
 * using. (Mouse or Touchscreen)
 */

import { createContext } from "react";

export const InputDeviceContext = createContext(null)