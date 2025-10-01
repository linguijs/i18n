import type { I18nBag, Replacements, Services, TranslatableText } from './types';
import DataStore from './DataStore';
import EventEmitter from './EventEmitter';
import Selector from './Selector';

class Translator extends EventEmitter {
  /**
   * Store.
   * Manage the translation messages.
   */
  private store: DataStore;

  /**
   * Message selector.
   */
  private selector: Selector;

  /**
   * I18n.
   */
  private i18n: I18nBag;

  /**
   * Constructor.
   */
  constructor(services: Services) {
    super();

    this.i18n = services.i18n;
    this.store = services.store;
    this.selector = services.selector;
  }

  /**
   * Translate.
   */
  translate<K extends string>(key: K, replaces?: Replacements, locale?: string): K|TranslatableText<K> {
    const translation = this.get(key, locale || this.i18n.currentLocale());

    if (typeof translation !== 'string') {
      console.warn('linguijs: You tried to retrieve a translation object, maybe you want to try i18n.store.getResource()?');
      return key;
    }

    if (!replaces) {
      return translation as TranslatableText<typeof key>;
    }

    return this.makeReplacements(translation || key, replaces) as TranslatableText<typeof key>;
  }

  /**
   * Translate based on a number.
   */
  choice<K extends string>(key: K, number: number, replaces: Replacements = {}, locale?: string): K|TranslatableText<K> {
    const currentLocale = locale || this.i18n.currentLocale();
    const translation = this.get(key, currentLocale);

    if (typeof translation !== 'string') {
      console.warn('linguijs: You tried to retrieve a translation object, maybe you want to try i18n.store.getResource()?');
      return key;
    }

    if (!replaces.count) {
      replaces.count = number;
    }

    return this.makeReplacements(
      this.selector.choose(translation, number, currentLocale),
      replaces
    ) as TranslatableText<typeof key>;
  }

  private get(key: string, locale: string) {
    let data = this.store.hasResourceLocale(locale)
      ? this.store.getDataByLocale(locale)
      : {};
    /**
     * For JSON translations, there are only one level deep so we do not need to do any
     * fancy searching throught it, so we will try to access it directly first before
     * assume that we are handling keyable translations.
     */
    let text = data[key] || this.store.get(key, data);

    // Non-existing translations and should load fallback
    const fallbackLocale = this.i18n.fallbackLocale();
    if ((!text || (text === key)) && fallbackLocale) {
      data = this.store.getDataByLocale(fallbackLocale as string);
      text = this.store.get(key, data);
    }

    return text || key;
  }

  private makeReplacements(text: string, replaces: Replacements) {
    const replacements = Object.keys(replaces).sort((a, b) => b.length - a.length);

    replacements.forEach((placeholder) => {
      const pattern = new RegExp(`:${placeholder}`, 'gi');
      text = text.replace(pattern, (match) => {
        const value = replaces[placeholder] as string;
        const isUpper = match === match.toUpperCase();

        if (isUpper) {
          return value.toUpperCase();
        }

        const isCap = match === match.replace(/\w/i, (l) => l.toUpperCase());

        if (isCap) {
          return value.split(' ').map(
            word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ).join(' ');
        }

        return value;
      });
    });

    return text;
  }
}

export default Translator;
