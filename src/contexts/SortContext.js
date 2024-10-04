import { createContext, useContext, useState } from 'react';

const SortContext = createContext();

export const SortProvider = ({ children }) => {
  const [sortOption, setSortOption] = useState('invest_amount_desc');

  return (
    <SortContext.Provider value={{ sortOption, setSortOption }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSort = () => {
  return useContext(SortContext);
};
