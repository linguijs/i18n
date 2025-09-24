import L10n from './L10n';
import Selector from './Selector';
import type { Replaces } from './types';

export default class Translator {
  /**
   * The message selector.
   */
  protected selector: Selector;

  constructor(protected l10n: L10n) {
    this.selector = new Selector();
  }

  /**
   * Translate the given message.
   */
  translate(key: string, replaces?: Replaces, locale?: string) {
    const text = this.get(key, locale);

    if (!replaces) {
      return text;
    }

    return this.makeReplacements(text ?? key, replaces);
  }

  /**
   * Translate the given message base on a count.
   */
  choice(key: string, number: number, replaces: Replaces = {}, locale?: string) {
    const currentLocale = locale ?? this.l10n.currentLocale();
    const text = this.get(key, locale);

    if (!replaces.count) {
      replaces.count = number;
    }

    return this.makeReplacements(this.selector.choose(text, number, currentLocale), replaces);
  }

  /**
   * Get the message on locale data, return key if not exist.
   */
  private get(key: string, locale?: string, fallback: boolean = true) {
    const currentLocale = locale ?? this.l10n.currentLocale();
    const localeData = this.l10n.getLocaleData(currentLocale);
    /**
     * For JSON translations, there are only one level deep so we do not need to do any
     * fancy searching throught it, so we will try to access it directly first before
     * assume that we are handling keyable translations.
     */
    let text = localeData[key] || this.getByKey(key, localeData);

    if (!text && fallback) {
      const fallbackLocaleData = this.l10n.getLocaleData(this.l10n.getFallbackLocale());
      text = this.getByKey(key, fallbackLocaleData);
    }

    return text ?? key;
  }

  private getByKey(key: string, localeData: object) {
    const getUsingRegExp = (regExp: RegExp) =>
      String.prototype.split
        .call(key, regExp)
        .filter(Boolean)
        .reduce((res: any, key: string) => (res !== null && res !== undefined ? res[key] : res), localeData);
    const result = getUsingRegExp(/[,[\]]+?/) || getUsingRegExp(/[,[\].]+?/);

    return result === undefined || result === localeData ? undefined : result;
  }

  /**
   * Make placeholder replacements in given message.
   */
  private makeReplacements(text: string, replaces: Replaces) {
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
          return value.charAt(0).toUpperCase() + value.slice(1);
        }

        return value;
      });
    });

    return text;
  }
}
