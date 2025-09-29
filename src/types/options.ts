
/**
 * Built-in plugins.
 */
export type PluginOptions = {
  detection?: object;
};

type Lang = `${Lowercase<string>}${Lowercase<string>}`;
type Region = `${Uppercase<string>}${Uppercase<string>}`;

/**
 * For languages that differ by territory, you should name the language
 * directories according to the ISO 15897. For example, "en_GB" should be
 * used for British English rather than "en-gb".
 *
 * @example
 * en
 * en_US
 */
export type Locale = Lang | `${Lang}_${Region}`;

type ResourceValue = string | {
  [key: string]: string | ResourceValue;
};

export interface ResourceLocale {
  [namespaceOrTranslationKey: string]: ResourceValue;
};

/**
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
  [locale: Locale]: ResourceLocale;
}

export interface InitOptions extends PluginOptions {
  /**
   * Logs info level to console output. Helps finding issues with loading not working.
   * @default false
   */
  debug?: boolean;

  /**
   * Resources to initialize with (if not using loading or not appending using addResourceBundle)
   * @default undefined
   */
  resources?: Resource;

  /**
   * Locale to use (overrides locale detection). Make sure you use the 'en_US' format, instead of hyphens or similar.
   * @default undefined
   */
  locale?: Locale;

  /**
   * Fallback locale to use if translations in user language are not available. Setting it explicitly to `false` will not
   * trigger to load the fallbackLocale at all.
   * @default 'en'
   */
  fallbackLocale?: Locale;
}
