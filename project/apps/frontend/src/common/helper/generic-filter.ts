/* eslint-disable eqeqeq */
import { IFilter } from '../interface/filter';

// filter n properties for truthy or falsy values on type T (no effect if no filter selected)
export function genericFilter<T, V>(object: T, activeFilters: Array<IFilter<T, V>>) {
  // no filters; no effect - return true
  if (activeFilters.length === 0) {
    return true;
  }

  // console.log({ object, filters: activeFilters, isGood });
  return activeFilters.some((filter) => object[filter.property] == filter.value);
}
