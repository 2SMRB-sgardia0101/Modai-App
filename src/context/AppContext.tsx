import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Language, Theme, UserData } from '../types';
import { TRANSLATIONS } from '../constants';
import { clearAuthToken, setAuthToken, updateUserRequest } from '../services/api';

type TranslationPack = (typeof TRANSLATIONS)['es'];
const STORAGE_KEY = 'modai_user';
const DEFAULT_LANGUAGE: Language = 'es';
const DEFAULT_THEME: Theme = 'light';

interface AppContextType {
  user: UserData | null;
  language: Language;
  theme: Theme;
  isAuthenticated: boolean;
  login: (userData: UserData, token: string) => void;
  logout: () => void;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  updateUser: (data: Partial<UserData>) => Promise<void>;
  lastError: string | null;
  clearLastError: () => void;
  t: TranslationPack;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getStoredUser = (): UserData | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved) as UserData;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialUser = useMemo(() => getStoredUser(), []);
  const [user, setUser] = useState<UserData | null>(initialUser);
  const [language, setLanguageState] = useState<Language>(initialUser?.language || DEFAULT_LANGUAGE);
  const [theme, setThemeState] = useState<Theme>(initialUser?.theme || DEFAULT_THEME);
  const [lastError, setLastError] = useState<string | null>(null);

  // Effect for Theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback((userData: UserData, token: string) => {
    setAuthToken(token);
    setUser(userData);
    setLastError(null);
    setLanguageState(userData.language || DEFAULT_LANGUAGE);
    setThemeState(userData.theme || DEFAULT_THEME);
  }, []);

  const logout = useCallback(() => {
    clearAuthToken();
    setUser(null);
    setLastError(null);
    setLanguageState(DEFAULT_LANGUAGE);
    setThemeState(DEFAULT_THEME);
  }, []);

  const clearLastError = useCallback(() => {
    setLastError(null);
  }, []);

  const updateUser = useCallback(async (data: Partial<UserData>) => {
    if (!user) return;

    const previousUser = user;
    const localUser = { ...user, ...data };
    setUser(localUser);

    if (data.language) setLanguageState(data.language);
    if (data.theme) setThemeState(data.theme);

    if (!user._id) return;

    try {
      const updatedUser = await updateUserRequest(user._id, data);
      setUser(updatedUser);
      setLastError(null);
      setLanguageState(updatedUser.language || DEFAULT_LANGUAGE);
      setThemeState(updatedUser.theme || DEFAULT_THEME);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo guardar la información.';
      setLastError(message);
      setUser(previousUser);
      setLanguageState(previousUser.language || DEFAULT_LANGUAGE);
      setThemeState(previousUser.theme || DEFAULT_THEME);
      throw error;
    }
  }, [user]);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setThemeState(nextTheme);
    if (user) {
      void updateUser({ theme: nextTheme }).catch(() => undefined);
    }
  }, [theme, user, updateUser]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (user) {
      void updateUser({ language: lang }).catch(() => undefined);
    }
  }, [user, updateUser]);

  const t = useMemo(() => TRANSLATIONS[language], [language]);

  const contextValue = useMemo(() => ({
    user,
    language,
    theme,
    isAuthenticated: !!user,
    login,
    logout,
    setLanguage,
    toggleTheme,
    updateUser,
    lastError,
    clearLastError,
    t
  }), [user, language, theme, login, logout, setLanguage, toggleTheme, updateUser, lastError, clearLastError, t]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};