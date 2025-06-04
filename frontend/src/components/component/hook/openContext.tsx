// OpenContext.tsx
import { createContext, useContext } from 'react';

export const OpenContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const useOpen = () => {
  const context = useContext(OpenContext);
  if (!context) throw new Error('useOpen must be used within OpenProvider');
  return context;
};