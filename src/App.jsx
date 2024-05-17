import { createContext, useState } from 'react';
import HomePage from './routes/HomePage';
import './scss/app.scss';

export const ThemeContext = createContext()


export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMOde] = useState(false)
  const toggleTheme = () => {
    setIsDarkMOde(prev => !prev)
  }
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }} >
      {children}
    </ThemeContext.Provider >
  )
}


function App() {

  return (
    <> <ThemeProvider><HomePage /></ThemeProvider></>
  )
}

export default App;
