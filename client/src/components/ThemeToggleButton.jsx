import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className='px-6'>
      {theme === 'light' ? 'dark' : 'light'} mode  
      <button
        className="p-2 dark:bg-gray-800  dark:text-white rounded ml-4 "
        onClick={toggleTheme}
      >
        <i className={theme === 'light' ? 'fa-regular fa-moon' : 'fa-regular fa-sun'}></i>
      </button>
    </div>


  );
};

export default ThemeToggleButton;

