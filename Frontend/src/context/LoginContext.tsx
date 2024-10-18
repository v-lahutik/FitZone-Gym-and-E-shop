import { useState, createContext, ReactNode } from 'react';

interface LoginContextType {
  loginOpen: boolean;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextType>({
  loginOpen: false,
  setLoginOpen: () => {}
});

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <LoginContext.Provider value={{ loginOpen, setLoginOpen }}>
      {children}
    </LoginContext.Provider>
  );
};
