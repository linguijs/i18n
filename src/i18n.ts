import DataStore from './DataStore';
import defaults from './defaults';
import EventEmitter from './EventEmitter';
import Selector from './Selector';
import Translator from './Translator';
import type { FallbackLocale, I18nBag, I18nOptions, Replacements, Services, TranslatableText } from './types';

interface I18nEvents {
  initialized: [options: I18nOptions];
  changingLocale: [locale: string];
  changedLocale: [locale: string];
}

class I18n extends EventEmitter<I18nEvents> {
  /**
   * Initialized flag.
   */
  public initialized: boolean = false;

  /**
   * Store instance.
   */
  public store!: DataStore;

  /**
   * Current locale.
   */
  private locale!: string;

  /**
   * Fallback locale.
   */
  private fallbackLocale!: FallbackLocale;

  /**
   * I18n options.
   */
  private options?: I18nOptions;

  /**
   * Translator instance.
   */
  private translator!: Translator;

  /**
   * Constructor.
   */
  constructor(options: I18nOptions = {}) {
    super();
    this.options = options;
  }

  /**
   * Create a new I18n instance.
   */
  static create(options: I18nOptions = {}) {
    return new I18n(options);
  }

  /**
   * Initialize.
   */
  init(options: I18nOptions = {}) {
    this.options = { ...defaults, ...this.options, ...options };

    if (this.initialized) {
      console.warn('I18n already initialized');
      return this;
    }

    this.locale = this.options.locale || this.detectLocale();
    this.fallbackLocale = this.options.fallbackLocale!;

    this.store = new DataStore(this.options.resources);

    const selector = new Selector();
    const i18nBag: I18nBag = {
      fallbackLocale: this.getFallbackLocale.bind(this),
      currentLocale: this.currentLocale.bind(this),
    };

    const services: Services = {
      selector,
      i18n: i18nBag,
      store: this.store,
    };

    this.translator = new Translator(services);
    // Pipe events from translator.
    // With this we can use `i18n.on('translatorEvent', () => {})`
    this.translator.on('*', (event, ...args) => {
      this.emit(event, ...args);
    });

    this.initialized = true;

    this.emit('initialized', this.options);

    return this;
  }

  /**
   * Retrieves the current locale.
   */
  currentLocale() {
    return this.locale;
  }

  /**
   * Set the current locale.
   */
  setLocale(locale: string) {
    this.emit('changingLocale', locale);

    if (!this.store.hasLocaleSomeTranslations(locale)) {
      console.warn('linguijs: Was not possible to change locale due the given locale does not have translations.');
    } else {
      this.locale = locale;

      this.emit('changedLocale', locale);
    }

    return this;
  }

  /**
   * Determine if is the current locale.
   */
  isLocale(locale: string) {
    return locale === this.locale;
  }

  /**
   * Retrieves the fallback locale.
   */
  getFallbackLocale() {
    return this.fallbackLocale;
  }

  /**
   * Set the fallback locale.
   */
  setFallbackLocale(fallbackLocale: FallbackLocale) {
    this.fallbackLocale = fallbackLocale;

    return this;
  }

  /**
   * Translate the given message or key.
   */
  trans<K extends string>(key: K, replaces?: Replacements, locale?: string): K | TranslatableText<K> {
    return this.translator?.translate(key, replaces, locale);
  }

  /**
   * Translate based on a number.
   */
  choice<K extends string>(
    key: K,
    number: number,
    replaces: Replacements = {},
    locale?: string,
  ): K | TranslatableText<K> {
    return this.translator?.choice(key, number, replaces, locale);
  }

  /**
   * Detect locale.
   * @todo migrate it to a plugin.
   */
  private detectLocale() {
    return document.documentElement.getAttribute('lang') || 'en';
  }
}

const i18n = I18n.create();

(i18n as any).create = I18n.create;

export { I18n };
export default i18n;
