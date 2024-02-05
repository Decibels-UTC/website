// AuthContext.js
import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
 const [isOpen, seIsOpen] = useState(false);


 return (
    <ModalProvider value={{ isOpen, seIsOpen }}>
      {children}
    </ModalProvider>
 );
};