import { SORT_BY, SORT_DIRECTION } from './common.const';

const DEFAULT_SORT_BY = SORT_BY.Date;

const DEFAULT_SORT_DIRECTION = SORT_DIRECTION.Asc;

const DEFAULT_ACTIVE_SORTING = {
  property: DEFAULT_SORT_BY,
  isDescending: false,
};

export {
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_ACTIVE_SORTING,
}
