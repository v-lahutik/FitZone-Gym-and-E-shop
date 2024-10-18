import { useState, createContext, ReactNode } from 'react';

interface LoginContextType {
  loginOpen: boolean;
  resetPassOpen: boolean;
  setResetPassOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextType>({
  resetPassOpen: false,
  loginOpen: false,
  setResetPassOpen: () => {},
  setLoginOpen: () => {}
});

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [resetPassOpen, setResetPassOpen] = useState(false);

  return (
    <LoginContext.Provider
      value={{ loginOpen, setLoginOpen, resetPassOpen, setResetPassOpen }}
    >
      {children}
    </LoginContext.Provider>
  );
};
