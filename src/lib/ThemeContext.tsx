import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'korteck-dark' | 'ash-light' | 'cyber-blue';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  glassEffect: boolean;
  setGlassEffect: (enabled: boolean) => void;
  animations: boolean;
  setAnimations: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('korteck-theme');
    return (saved as Theme) || 'korteck-dark';
  });
  
  const [glassEffect, setGlassEffect] = useState(() => {
    const saved = localStorage.getItem('korteck-glass');
    return saved !== null ? saved === 'true' : true;
  });

  const [animations, setAnimations] = useState(() => {
    const saved = localStorage.getItem('korteck-animations');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove('korteck-dark', 'ash-light', 'cyber-blue', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Compatibility with Tailwind dark mode
    if (theme === 'korteck-dark' || theme === 'cyber-blue') {
      root.classList.add('dark');
    }
    
    // Update data attributes for special effects
    root.setAttribute('data-glass', glassEffect.toString());
    root.setAttribute('data-animations', animations.toString());
    
    localStorage.setItem('korteck-theme', theme);
    localStorage.setItem('korteck-glass', glassEffect.toString());
    localStorage.setItem('korteck-animations', animations.toString());
  }, [theme, glassEffect, animations]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      glassEffect, 
      setGlassEffect, 
      animations, 
      setAnimations 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
