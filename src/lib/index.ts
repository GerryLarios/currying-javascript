import curry from '../curry';

export const match = curry(
  (what: string, str: string) => str.match(what)
);

export const replace = curry(
  (what: string, replacement: string, str: string) => str.replace(what, replacement)
);

export const filter = curry(
  (fn: any, arr: Array<any>) => arr.filter(fn)
);

export const map = curry(
  (fn: any, arr: Array<any>) => arr.map(fn)
);
