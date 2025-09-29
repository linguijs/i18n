import I18n from '../i18n';

export type I18nInstance = typeof I18n;

export type PluginType =
  | 'logger'
  | '3rdParty';

export interface Plugin {
  type: PluginType;
}

export interface LoggerPlugin extends Plugin {
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

export interface ThirdPartyPlugin extends Plugin {
  type: '3rdParty';
  init(i18n: I18nInstance): void;
}

export interface Plugins {
  logger?: LoggerPlugin;
  external: ThirdPartyPlugin[];
}

// helper to identify class https://stackoverflow.com/a/45983481/2363935
export interface Newable<T> {
  new (...args: any[]): T;
}
export interface NewablePlugin<T extends Plugin> extends Newable<T> {
  type: T['type'];
}
