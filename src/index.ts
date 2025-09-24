import Lingui from './Lingui';
import type { Replaces } from './types';

const lingui = new Lingui();

export default lingui;

export const trans = (key: string, replaces?: Replaces, locale?: string): string => lingui.trans(key, replaces, locale);

export const transChoice = (key: string, number: number, replaces?: Replaces, locale?: string): string =>
  lingui.transChoice(key, number, replaces, locale);

export const __ = trans;
export const choice = transChoice;

export const setLocale = (locale: string) => lingui.setLocale(locale);
export const currentLocale = () => lingui.currentLocale();
