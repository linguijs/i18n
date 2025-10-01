import { Maybe, Resource, ResourceLocale } from './types';

export default class DataStore {
  /**
   * Constructor.
   */
  constructor(private data: Resource = {}) {}

  /**
   * Add a resource locale to the data store.
   */
  addResourceLocale(locale: string, resourceLocale: ResourceLocale, overwrite: boolean = true) {
    // @todo implement the logic.
    if (overwrite) {
      this.data[locale] = resourceLocale;
    }
  }

  /**
   * Check if the locale has some resource.
   */
  hasResourceLocale(locale: string) {
    return this.getDataByLocale(locale) !== undefined;
  }

  /**
   * Get the value from the data store.
   * It is based on Lodash get method.
   */
  get<K extends string>(key: K, resourceLocale: ResourceLocale): Maybe<string | object> {
    const _get = (regExp: RegExp) =>
      String.prototype.split
        .call(key, regExp)
        .filter(Boolean)
        .reduce((res: any, key: string) => (res !== null && res !== undefined ? res[key] : res), resourceLocale);
    const result = _get(/[,[\]]+?/) || _get(/[,[\].]+?/);

    return result === undefined || result === resourceLocale ? undefined : result;
  }

  /**
   * Get the data by locale.
   */
  getDataByLocale(locale: string) {
    return this.data[locale];
  }

  /**
   * Check if the locale has some translations.
   */
  hasLocaleSomeTranslations(locale: string) {
    const data = this.getDataByLocale(locale);
    const n = (data && Object.keys(data)) || [];
    return !!n.find((v) => data[v] && Object.keys(data[v]).length > 0);
  }
}
