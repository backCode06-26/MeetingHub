// OpenContext.tsx
import { createContext, useContext } from 'react';

export const OpenArrayContext = createContext<{
  id : number;
  openArray: boolean[];
  setOpenArray: React.Dispatch<React.SetStateAction<boolean[]>>;
} | null>(null);

export const useOpenArray = () => {
  const context = useContext(OpenArrayContext);
  if (!context) throw new Error('useOpen must be used within OpenProvider');
  return context;
};