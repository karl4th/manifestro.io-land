export {
  locales,
  defaultLocale,
  dictionaries,
  getDictionary,
  type Locale,
  type Dictionary,
} from "./dictionaries";
export { I18nProvider, useI18n } from "./context";

// Dental
export { dentalDictionaries, getDentalDictionary, type DentalLocale, type DentalDictionary } from "./dental";
export { DentalI18nProvider, useDentalI18n } from "./dental-context";
