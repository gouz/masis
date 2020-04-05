import { Masis } from './core';
import { MasisFilter } from './methods/filter';
import { MasisLazy } from './methods/lazy';
import { MasisPosition } from './methods/position';
import { MasisSort } from './methods/sort';

MasisFilter();
MasisLazy();
MasisPosition();
MasisSort();

export default {
  Masis: Masis
}