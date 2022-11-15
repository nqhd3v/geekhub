import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Moon from './Icons/Moon';
import Sun from './Icons/Sun';

const isDarkModeActivated = (): boolean =>
  (localStorage && localStorage.theme === 'dark') ||
  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

const getThemeString = (isDark: boolean): string => (isDark ? 'dark' : 'light')

interface IDarkModeToggle {
  className?: string;
}

const DarkModeToggle: React.FC<IDarkModeToggle> = ({ className }) => {
    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const toggleMode = (): void => {
      localStorage.theme = getThemeString(!isDarkMode)
      if (localStorage.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      setDarkMode(!isDarkMode)
    }

    useEffect(() => {
      setDarkMode(isDarkModeActivated());
    }, [])

    const darkModeActivated: boolean =
      typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
    return (
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <motion.button
          className={`flex items-center justify-center ${className || ''}`}
          onClick={toggleMode}
          key={darkModeActivated ? 'moon-icon' : 'sun-icon'}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          aria-label="Dark mode toggle"
        >
          {darkModeActivated ? <Sun size={32} color="#fef08a" /> : <Moon size={32} />}
        </motion.button>
      </AnimatePresence>
    )
}

export default DarkModeToggle