interface IFilter<T, V> {
  property: keyof T;
  value: V;
}

export {
  IFilter
}
