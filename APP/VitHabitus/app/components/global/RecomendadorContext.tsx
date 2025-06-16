import React, { createContext, useContext, useState } from 'react';

const RecomendadorContext = createContext<{
  ejecutando: boolean;
  setEjecutando: (value: boolean) => void;
}>({
  ejecutando: false,
  setEjecutando: () => {},
});

export const RecomendadorProvider = ({ children }: { children: React.ReactNode }) => {
  const [ejecutando, setEjecutando] = useState(false);

  return (
    <RecomendadorContext.Provider value={{ ejecutando, setEjecutando }}>
      {children}
    </RecomendadorContext.Provider>
  );
};
export const useRecomendador = () => useContext(RecomendadorContext);

export default RecomendadorProvider;