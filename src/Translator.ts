import type { I18nBag, Services } from './types';
import DataStore from './DataStore';
import EventEmitter from './EventEmitter';

class Translator extends EventEmitter {
  /**
   * Store.
   * Manage the translation messages.
   */
  private store: DataStore;

  /**
   * I18n.
   */
  private i18n: I18nBag;

  /**
   * Options.
   */
  private options: Record<string, any>;

  constructor(services: Services, options = {}) {
    super();

    this.store = services.store;
    this.i18n = services.i18n;
    this.options = options;

    console.log(this.store);
    console.log(this.i18n);
    console.log(this.options);
  }

  // translate<K extends string>(key: K, replaces?: Replacements, locale?: string): K|TranslatableText<K> {
  //   return key;
  // }

  // private getText<K extends string>(key: K, locale?: string): K|TranslatableText<K> {
  //   const currentLocale = locale;

  //   return key;
  // }
}

export default Translator;

// const translator = new Translator({ store: new DataStore() });

// translator.translate('Lorem Ipsum');
// translator.translate('auth.failed', { user: 'John Doe' }, 'pt-br');
