import { LoggerPlugin } from '../types';

const consoleLogger = {
  type: 'logger',

  log(...args: any[]) {
    this.output('log', ...args);
  },

  warn(...args: any[]) {
    this.output('warn', ...args);
  },

  error(...args: any[]) {
    this.output('error', ...args);
  },

  output(type, ...args: any) {
    console?.[type]?.(...args);
  },
} satisfies LoggerPlugin & {
  output(type: 'log' | 'warn' | 'error', message: string): void;
};

export default consoleLogger;
