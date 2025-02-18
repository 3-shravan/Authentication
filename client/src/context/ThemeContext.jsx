import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext('light');

export const ThemeProvider = ({ children }) => {
   const [theme, setTheme] = useState('dark');

   useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
         setTheme(savedTheme);
      }
   }, []);

   useEffect(() => {
      document.body.className = theme;
   }, [theme]);

   const toggleTheme = () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
   };

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};

export const useTheme = () => useContext(ThemeContext);