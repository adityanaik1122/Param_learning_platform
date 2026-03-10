import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeDensity = 'comfortable' | 'compact';
type ThemeMode = 'dark' | 'light';

interface ThemeContextValue {
  density: ThemeDensity;
  setDensity: (density: ThemeDensity) => void;
  toggleDensity: () => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const DENSITY_STORAGE_KEY = 'plh-theme-density';
const MODE_STORAGE_KEY = 'plh-theme-mode';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [density, setDensityState] = useState<ThemeDensity>('comfortable');
  const [mode, setModeState] = useState<ThemeMode>('dark');

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedDensity = window.localStorage.getItem(DENSITY_STORAGE_KEY) as ThemeDensity | null;
      if (storedDensity === 'comfortable' || storedDensity === 'compact') {
        setDensityState(storedDensity);
      }
      const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY) as ThemeMode | null;
      if (storedMode === 'dark' || storedMode === 'light') {
        setModeState(storedMode);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Sync density to <html data-plh-density="..."> and localStorage
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-plh-density', density);
    }
    try {
      window.localStorage.setItem(DENSITY_STORAGE_KEY, density);
    } catch {
      // ignore storage errors
    }
  }, [density]);

  // Sync mode to <html data-plh-theme="..."> and localStorage
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-plh-theme', mode);
    }
    try {
      window.localStorage.setItem(MODE_STORAGE_KEY, mode);
    } catch {
      // ignore storage errors
    }
  }, [mode]);

  const setDensity = (next: ThemeDensity) => {
    setDensityState(next);
  };

  const toggleDensity = () => {
    setDensityState((prev) => (prev === 'comfortable' ? 'compact' : 'comfortable'));
  };

  const setMode = (next: ThemeMode) => {
    setModeState(next);
  };

  const toggleMode = () => {
    setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value: ThemeContextValue = {
    density,
    setDensity,
    toggleDensity,
    mode,
    setMode,
    toggleMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

