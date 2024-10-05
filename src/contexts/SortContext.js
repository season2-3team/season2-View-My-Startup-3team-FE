import { createContext, useContext, useState } from 'react';

const SortContext = createContext();

export const SortProvider = ({ children }) => {
  const [orderBy, setOrderBy] = useState('sim_invest_desc');

  return (
    <SortContext.Provider value={{ orderBy, setOrderBy }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSort = () => {
  return useContext(SortContext);
};
