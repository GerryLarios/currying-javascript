/* eslint-disable @typescript-eslint/no-explicit-any */

export default function curry(fn: any): any {
  return function $curry(...args: any): any {
    return args.length < fn.length ? $curry.bind(null, ...args) : fn(...args);
  }
}
