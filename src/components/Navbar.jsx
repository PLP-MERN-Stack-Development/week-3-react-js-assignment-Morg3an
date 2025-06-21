import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">PLP Task Manager</h1>
        <Button variant="secondary" onClick={toggleTheme}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;