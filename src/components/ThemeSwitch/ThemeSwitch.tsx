import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import './ThemeSwitch.css'

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <button
      className={`theme-toggle ${isDark ? 'theme-toggle--dark' : 'theme-toggle--light'}`}
      onClick={toggleTheme}
      type="button"
      aria-label={`Current theme: ${isDark ? 'Dark Mode' : 'Light Mode'}. Tap to switch to ${isDark ? 'Light' : 'Dark'} mode.`}
      title={isDark ? 'Dark Mode (Tap for Light Mode)' : 'Light Mode (Tap for Dark Mode)'}
      data-cursor="pointer"
    >
      <span className="theme-toggle__icon-box">
        {isDark ? (
          <Moon size={14} className="theme-toggle__icon" />
        ) : (
          <Sun size={14} className="theme-toggle__icon" />
        )}
      </span>
      <span className="theme-toggle__label">{isDark ? 'DARK' : 'LIGHT'}</span>
      <span className="theme-toggle__dot" aria-hidden="true" />
    </button>
  )
}
