import { createContext, useContext } from 'react';

export type ViewContext = {
  mode: 'dark' | 'light';
};

const initialData = { mode: 'light' } as const;

const viewContext = createContext<ViewContext>(initialData);

export const ViewContextProvider = viewContext.Provider;
export const useViewContext = () => useContext(viewContext);
