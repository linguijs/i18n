import type { InitOptions, Module, Replaces } from './types';
import defaults from './defaults';
import L10n from './L10n';
import Translator from './Translator';
import EventEmitter from './EventEmitter';

class Lingui extends EventEmitter {
  initialized: boolean = false;

  /**
   * The l10n service.
   */
  l10n!: L10n;

  /**
   * The translator service.
   */
  translator!:Translator;

  protected modules: {
    external: Module[],
  };

  constructor(
    protected options = {}
  ) {
    super();

    this.modules = { external: [] };
  }

  /**
   * The modules system.
   */
  use(module: Module) {
    if (module.type === '3rdParty') {
      this.modules.external.push(module);
    }

    return this;
  }

  init(options: InitOptions) {
    this.options = {
      ...defaults,
      ...this.options,
      ...options
    };

    this.l10n = new L10n(options.resources, this.options);
    this.translator = new Translator(this.l10n);

    this.modules.external.forEach(m => {
      if (m.init) m.init(this);
    });

    this.initialized = true;

    this.emit('initialized', this.options);

    return this;
  }

  /**
   * Get the current application locale.
   */
  currentLocale() {
    return this.l10n.currentLocale();
  }

  /**
   * Set the current application locale.
   */
  setLocale(locale: string) {
    return this.l10n.setLocale(locale);
  }

  /**
   * Determine if the application locale is the given locale.
   */
  isLocale(locale: string) {
    return this.l10n.isLocale(locale);
  }

  /**
   * Determine if the application translations has the given locale.
   */
  hasLocale(locale: string) {
    return this.l10n.hasLocale(locale);
  }

  /**
   * Translate the given message.
   */
  trans(key: string, replaces?: Replaces, locale?: string): string {
    return this.translator.translate(key, replaces, locale);
  }

  /**
   * Translate the given message base on a count.
   */
  transChoice(key: string, number: number, replaces?: Replaces, locale?: string): string {
    return this.translator.choice(key, number, replaces, locale);
  }
}

export default Lingui;
