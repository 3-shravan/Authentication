import React from 'react'

const MenuContext = React.createContext();

export const MenuProvider = ({ children }) => {

   const [menu, setMenu] = React.useState(false);
   const [isMenuDisabled, setIsMenuDisabled] = React.useState(false);

   const disableMenu = () => setIsMenuDisabled(true);
   const enableMenu = () => setIsMenuDisabled(false);

   const toggleMenu = () => {
      setMenu((prev) => !prev);
   };

   return (
      <MenuContext.Provider value={{ menu, toggleMenu, isMenuDisabled, disableMenu, enableMenu }}>
         {children}
      </MenuContext.Provider>
   )
}

export const useMenu = () => React.useContext(MenuContext)

