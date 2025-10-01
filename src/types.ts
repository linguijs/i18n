import StoreData from './DataStore';
import Selector from './Selector';

/**
 * Maybe type.
 */
export type Maybe<T> = T | undefined | null;

/**
 * Setting locale explicity to `false` will not trigger to
 * load the fallbackLocale at all.
 */
export type FallbackLocale = string | false;

/**
 * Return type for string translation functions.
 *
 * This type should be treated as if it were `string`.
 */
export type TranslatableText<T extends string> = string & {
  /**
   * DO NOT USE! This property _does not exist_.
   * @private
   */
  readonly __translatableText: T;
};

/**
 * Used to replace placeholders in a string.
 */
export type Replacements = Record<string, string | number>;

type ResourceValue =
  | string
  | {
      [key: string]: string | ResourceValue;
    };

export interface ResourceLocale {
  [namespaceOrTranslationKey: string]: ResourceValue;
}

/**
 * Resources containing the translations.
 *
 * @example
 * {
 *   en: {
 *     common: {
 *       hello: 'Hello',
 *     },
 *   },
 *   pt_BR: {
 *     common: {
 *       hello: 'Olá',
 *     },
 *     "Welcome back :Name!": "Bem vindo de volta :Name!",
 *   }
 * }
 */
export interface Resource {
  [locale: string]: ResourceLocale;
}

export type I18nBag = {
  fallbackLocale: () => FallbackLocale;
  currentLocale: () => string;
};

export interface Services {
  i18n: I18nBag;
  store: StoreData;
  selector: Selector;
}

export interface I18nOptions {
  /**
   * Logs info level to console output. Helps finding issues with loading not working.
   * @default false
   */
  debug?: boolean;

  /**
   * Locale to use (overrides locale detection). Make sure you use the 'en_US' format, instead of hyphens or similar.
   * @default undefined
   */
  locale?: string;

  /**
   * Fallback locale to use if translations in user language are not available. Setting it explicitly to `false` will not
   * trigger to load the fallbackLocale at all.
   * @default 'en'
   */
  fallbackLocale?: FallbackLocale;

  /**
   * Resources to initialize with (if not using loading or not appending using addResourceBundle)
   * @default undefined
   */
  resources?: Resource;
}
