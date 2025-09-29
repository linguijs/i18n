import type {
  InitOptions,
  Plugins,
  Plugin,
  NewablePlugin,
  Newable,
  ThirdPartyPlugin,
  LoggerPlugin,
} from './types';
import defaults from './defaults';
import { instanceOfPlugin } from './utils';
import baseLogger, { Logger } from './logger';

class I18n {
  /**
   * Whether the I18n instance has been initialized.
   */
  initialized: boolean = false;

  /**
   * List of plugins used.
   */
  protected plugins: Plugins;

  /**
   * Logger instance.
   */
  protected logger: Logger;

  /**
   * Constructor.
   *
   * @param options
   */
  constructor(protected options: InitOptions = {}) {
    this.plugins = { external: [] };
    this.logger = baseLogger;
  }

  /**
   * Singleton creation.
   */
  static create(options: InitOptions = {}) {
    return new I18n(options);
  }

  /**
   * Make a new instance of a class.
   */
  make<T>(classObject: T | Newable<T>) {
    if (!classObject) return null;
    if (typeof classObject === 'function') return new (classObject as Newable<T>)(this.options);
    return classObject;
  }

  /**
   * Use a plugin.
   */
  use<T extends Plugin>(plugin: T | NewablePlugin<T> | Newable<T>) {
    if (!instanceOfPlugin(plugin)) {
      throw new Error(
        'You are passing a wrong plugin! Please check the object you are passing to i18n.use()'
      );
    }

    const p = this.make(plugin);

    if (p?.type === 'logger') {
      this.plugins.logger = p as unknown as LoggerPlugin;
    }

    if (p?.type === '3rdParty') {
      this.plugins.external.push(p as unknown as ThirdPartyPlugin);
    }

    return this;
  }

  /**
   * Initialize the I18n instance.
   */
  init(options: InitOptions = {}) {
    this.options = { ...defaults, ...this.options, ...options};

    if (this.plugins.logger) {
      baseLogger.init(this.options, this.plugins.logger);
    } else {
      baseLogger.init(this.options);
    }

    if (this.initialized) {
      this.logger.warn('init: linguijs is already initialized. You should call init just once!');
      return this;
    }

    const services: Record<string, any> = {};
    services.logger = baseLogger;

    this.initialized = true;

    return this;
  }
}

const instance = I18n.create();

(instance as any).create = I18n.create;

export default instance;

