import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeDensity = 'comfortable' | 'compact';
<<<<<<< HEAD
type ThemeMode = 'dark' | 'light';
=======
>>>>>>> 5a466be98bc48dec8448d8e8d70d985e9684170d

interface ThemeContextValue {
  density: ThemeDensity;
  setDensity: (density: ThemeDensity) => void;
  toggleDensity: () => void;
<<<<<<< HEAD
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
=======
>>>>>>> 5a466be98bc48dec8448d8e8d70d985e9684170d
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const DENSITY_STORAGE_KEY = 'plh-theme-density';
<<<<<<< HEAD
const MODE_STORAGE_KEY = 'plh-theme-mode';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [density, setDensityState] = useState<ThemeDensity>('comfortable');
  const [mode, setModeState] = useState<ThemeMode>('dark');
=======

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [density, setDensityState] = useState<ThemeDensity>('comfortable');
>>>>>>> 5a466be98bc48dec8448d8e8d70d985e9684170d

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
<<<<<<< HEAD
      const storedDensity = window.localStorage.getItem(DENSITY_STORAGE_KEY) as ThemeDensity | null;
      if (storedDensity === 'comfortable' || storedDensity === 'compact') {
        setDensityState(storedDensity);
      }
      const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY) as ThemeMode | null;
      if (storedMode === 'dark' || storedMode === 'light') {
        setModeState(storedMode);
=======
      const stored = window.localStorage.getItem(DENSITY_STORAGE_KEY) as ThemeDensity | null;
      if (stored === 'comfortable' || stored === 'compact') {
        setDensityState(stored);
>>>>>>> 5a466be98bc48dec8448d8e8d70d985e9684170d
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

<<<<<<< HEAD
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

=======
>>>>>>> 5a466be98bc48dec8448d8e8d70d985e9684170d
  const setDensity = (next: ThemeDensity) => {
    setDensityState(next);
  };

  const toggleDensity = () => {
    setDensityState((prev) => (prev === 'comfortable' ? 'compact' : 'comfortable'));
  };

<<<<<<< HEAD
  const setMode = (next: ThemeMode) => {
    setModeState(next);
  };

  const toggleMode = () => {
    setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

=======
>>>>>>> 5a466be98bc48dec8448d8e8d70d985e9684170d
  const value: ThemeContextValue = {
    density,
    setDensity,
    toggleDensity,
<<<<<<< HEAD
    mode,
    setMode,
    toggleMode,
=======
>>>>>>> 5a466be98bc48dec8448d8e8d70d985e9684170d
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

