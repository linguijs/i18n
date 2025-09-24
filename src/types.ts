export type Replaces = Record<string, string|number>;

type NestedLocaleData = {
  [key: string]: string | NestedLocaleData
};

export type LocaleData = {
  [key: string]: string | NestedLocaleData
};

export type Resources = {
  [locale: string]: LocaleData
};

export interface InitOptions {
  /**
   * Locale to use (if not provided we'll try to detect if not 'en')
   * @default en
   */
  locale?: string;

  /**
   * Fallback locale to use.
   * @default en
   */
  fallbackLocale?: string;

  /**
   * Resources to initialize with.
   */
  resources: Resources;
};
