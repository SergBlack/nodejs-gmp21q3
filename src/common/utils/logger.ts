/* eslint-disable no-console */

export class Logger {
  static log(message: string | object) {
    console.log(message);
  }

  static table(data: unknown[]) {
    console.table(data);
  }

  static error(err: unknown, ...rest: unknown[]) {
    console.error(err, ...rest);
  }
}
