import type { I18n } from './i18n';
import i18n from './i18n';
import type { FallbackLocale, Replacements, TranslatableText } from './types';

/**
 * Retrieve the translation of key or text.
 */
export const __: <K extends string>(key: K, replaces?: Replacements, locale?: string) => K | TranslatableText<K> =
  i18n.trans.bind(i18n);

/**
 * Retrieve the translation of key or text.
 */
export const trans: <K extends string>(key: K, replaces?: Replacements, locale?: string) => K | TranslatableText<K> =
  i18n.trans.bind(i18n);

/**
 * Translates and retrieves the singular or plural form based on the
 * supplied number.
 */
export const choice: <K extends string>(
  key: K,
  number: number,
  replaces?: Replacements,
  locale?: string,
) => K | TranslatableText<K> = i18n.choice.bind(i18n);

/**
 * Translates and retrieves the singular or plural form based on the
 * supplied number.
 */
export const transChoice: <K extends string>(
  key: K,
  number: number,
  replaces?: Replacements,
  locale?: string,
) => K | TranslatableText<K> = i18n.choice.bind(i18n);

/**
 * Retrieve the current locale.
 */
export const currentLocale: () => string = i18n.currentLocale.bind(i18n);

/**
 * Set locale.
 */
export const setLocale: (locale: string) => I18n = i18n.setLocale.bind(i18n);

/**
 * Check if the given locale is the current locale.
 */
export const isLocale: (locale: string) => boolean = i18n.isLocale.bind(i18n);

/**
 * Retrieve the fallback locale.
 */
export const fallbackLocale: () => FallbackLocale = i18n.getFallbackLocale.bind(i18n);

/**
 * Set fallback locale.
 */
export const setFallbackLocale: (fallbackLocale: FallbackLocale) => I18n = i18n.setFallbackLocale.bind(i18n);
