import React, { createContext, useContext, useState } from 'react';

interface LoadingContextType {
  showLoader: (message?: string) => void;
  hideLoader: () => void;
  isLoading: boolean;
  message: string;
}

const LoadingContext = createContext<LoadingContextType>({
  showLoader: () => {},
  hideLoader: () => {},
  isLoading: false,
  message: '',
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const showLoader = (msg?: string) => {
    setMessage(msg || '');
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
    setMessage('');
  };

  return (
    <LoadingContext.Provider value={{ showLoader, hideLoader, isLoading, message }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
