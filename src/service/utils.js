import {
  cond,
  F,
  isEmpty,
  isNil,
  not,
  T
} from 'ramda';

const box = x => ({
  map: f => box(f(x)),
  fold: f => f(x)
});

const exists = cond([
  [isNil, F],
  [isEmpty, F],
  [T, T]
]);

const notExists = v => not(exists(v));

export {
  box,
  exists,
  notExists
}
