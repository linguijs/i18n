import { Resources } from "./types";

export default class L10n {
  protected locale: string;
  protected fallbackLocale: string;

  constructor(
    protected data: Resources,
    protected options: {
      locale?: string,
      fallbackLocale?: string,
    } = {},
  ) {
    this.locale = options.locale || this.detectLocale() || 'en';
    this.fallbackLocale = options.fallbackLocale || 'en';
  }

  /**
   * Get the current locale.
   */
  currentLocale() {
    return this.locale;
  }

  /**
   * Set the current locale.
   */
  setLocale(locale: string) {
    this.locale = locale;
  }

  /**
   * Get the fallback locale.
   */
  getFallbackLocale() {
    return this.fallbackLocale;
  }

  /**
   * Determine if the locale is the given locale.
   */
  isLocale(locale: string) {
    return locale === this.locale;
  }

  /**
   * Determine if the data has the given locale.
   */
  hasLocale(locale: string) {
    return Object.keys(this.data).includes(locale);
  }

  /**
   * Get data for the given locale.
   */
  getLocaleData(locale: string) {
    return this.data[locale];
  }

  /**
   * Detect locale from DOM attribute.
   */
  private detectLocale() {
    return document.documentElement.getAttribute('lang');
  }
}
