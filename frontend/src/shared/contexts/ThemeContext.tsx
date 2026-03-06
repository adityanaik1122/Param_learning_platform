import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeDensity = 'comfortable' | 'compact';

interface ThemeContextValue {
  density: ThemeDensity;
  setDensity: (density: ThemeDensity) => void;
  toggleDensity: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const DENSITY_STORAGE_KEY = 'plh-theme-density';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [density, setDensityState] = useState<ThemeDensity>('comfortable');

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(DENSITY_STORAGE_KEY) as ThemeDensity | null;
      if (stored === 'comfortable' || stored === 'compact') {
        setDensityState(stored);
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

  const setDensity = (next: ThemeDensity) => {
    setDensityState(next);
  };

  const toggleDensity = () => {
    setDensityState((prev) => (prev === 'comfortable' ? 'compact' : 'comfortable'));
  };

  const value: ThemeContextValue = {
    density,
    setDensity,
    toggleDensity,
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

