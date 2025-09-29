import type { LoggerPlugin } from "./types";
import { isString } from "./utils";
import consoleLogger from "./plugins/logger";

type LoggerOptions = {
  prefix?: string;
  debug?: boolean;
};

class Logger {
  protected debug!: boolean;
  protected prefix!: string;
  protected logger!: LoggerPlugin;

  constructor(options?: LoggerOptions, logger?: LoggerPlugin) {
    this.init(options, logger);
  }

  init(options?: LoggerOptions, logger?: LoggerPlugin) {
    this.debug = options?.debug || false;
    this.prefix = options?.prefix || 'linguijs';
    this.logger = logger || consoleLogger;
  }

  log(...args: any[]) {
    return this.forward(args, 'log', '', true);
  }

  warn(...args: any[]) {
    return this.forward(args, 'warn', '', true);
  }

  error(...args: any[]) {
    return this.forward(args, 'error', '');
  }

  deprecate(...args: any[]) {
    return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
  }

  forward(args: any[], type: 'log' | 'warn' | 'error', prefix: string, debugOnly: boolean = false) {
    if (debugOnly && !this.debug) return null;
    if (isString(args[0])) args[0] = `${prefix}${this.prefix} ${args[0]}`;
    return this.logger[type](...args);
  }
}

export { Logger };
export default new Logger();
