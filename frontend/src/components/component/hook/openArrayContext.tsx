// OpenContext.tsx
import { createContext, useContext } from 'react';

type Reser = {
  id: number;
  username: string;
  roomName: string;
  reserDate: Date;
  startDate: number;
  endDate: number;
};

export const OpenArrayContext = createContext<{
  id : number;
  openArray: boolean[];
  setOpenArray: React.Dispatch<React.SetStateAction<boolean[]>>;
  reserList: Reser[];
  setReserList: React.Dispatch<React.SetStateAction<Reser[]>>
} | null>(null);

export const useOpenArray = () => {
  const context = useContext(OpenArrayContext);
  if (!context) throw new Error('useOpen must be used within OpenProvider');
  return context;
};