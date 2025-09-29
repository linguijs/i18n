import type { NewablePlugin, Plugin } from './types';

/**
 * Test if given value is a instance of plugin.
 */
export const instanceOfPlugin = (p: any): p is Plugin | NewablePlugin<Plugin> => {
  if (typeof p === 'object' && 'type' in p) {
    return true;
  }
  if (typeof p === 'function' && ('type' in p || 'prototype' in p)) {
    return true;
  }
  return false;
};

/**
 * Test if given value is a string.
 */
export const isString = (value: any): value is string => typeof value === 'string';
