const SORT_BY = {
  Price: 'price',
  Date: 'createdAt',
} as const;

const SORT_DIRECTION = {
  Asc: 'asc',
  Desc: 'desc',
} as const;

export {
  SORT_BY,
  SORT_DIRECTION,
}
