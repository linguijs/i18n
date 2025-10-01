import type {
  FallbackLocale,
  I18nOptions,
  Services,
  I18nBag,
} from "./types";
import defaults from "./defaults";
import DataStore from "./DataStore";
import Selector from "./Selector";
import Translator from "./Translator";
import EventEmitter from "./EventEmitter";

interface I18nEvents {
  'initialized': [options: I18nOptions]
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
  private locale?: string;

  /**
   * Fallback locale.
   */
  private fallbackLocale?: FallbackLocale;

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
    this.fallbackLocale = this.options.fallbackLocale;

    this.store = new DataStore(this.options.resources);

    const selector = new Selector();
    const i18nBag: I18nBag = {
      fallbackLocale: this.fallbackLocale,
      currentLocale: this.currentLocale.bind(this),
    };

    const services: Services = {
      selector,
      i18n: i18nBag,
      store: this.store,
    };

    this.translator = new Translator(services, this.options);
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
    this.locale = locale;
  }

  /**
   * Determine if is the current locale.
   */
  isLocale(locale: string) {
    return locale === this.locale;
  }

  /**
   * Translate the given message or key.
   */
  // trans<K extends string>(key: K, replaces?: Replacements, locale?: string): K|TranslatableText<K> {
  //   return this.translator?.translate(key, replaces, locale);
  // }

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
