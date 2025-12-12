"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { getDentalDictionary, dentalDictionaries } from "./dental";

type DentalLocale = keyof typeof dentalDictionaries;

interface DentalI18nContextType {
  locale: DentalLocale;
  dictionary: ReturnType<typeof getDentalDictionary>;
  setLocale: (locale: DentalLocale) => void;
}

const DentalI18nContext = createContext<DentalI18nContextType | undefined>(undefined);

const defaultDentalLocale: DentalLocale = "ru";

export function DentalI18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<DentalLocale>(defaultDentalLocale);
  const [dictionary, setDictionary] = useState(getDentalDictionary(defaultDentalLocale));

  const setLocale = useCallback((newLocale: DentalLocale) => {
    setLocaleState(newLocale);
    setDictionary(getDentalDictionary(newLocale));
  }, []);

  return (
    <DentalI18nContext.Provider value={{ locale, dictionary, setLocale }}>
      {children}
    </DentalI18nContext.Provider>
  );
}

export function useDentalI18n() {
  const context = useContext(DentalI18nContext);
  if (!context) {
    throw new Error("useDentalI18n must be used within a DentalI18nProvider");
  }
  return context;
}
