import cn from 'classnames';
import {
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIRECTION,
  SORT_BY,
  SORT_DIRECTION,
} from '../../common';
import {
  TSortingValues,
  TDirectionValues,
} from '../../common/type/sorting.type';

interface ISortByEventTarget extends EventTarget {
  getAttribute: (name: string) => string | null;
}

const DATA_SORT_BY = 'data-sort-by';
const DATA_SORT_DIRECTION = 'data-sort-direction';

type TSortProps = {
  sorting: TSortingValues;
  direction: TDirectionValues;
  onSortingChange: (sorting: TSortingValues) => void;
  onDirectionChange: (direction: TDirectionValues) => void;
};

function Sort({
  sorting = DEFAULT_SORT_BY,
  direction = DEFAULT_SORT_DIRECTION,
  onSortingChange,
  onDirectionChange,
}: TSortProps): JSX.Element {
  const handleSortByClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const currentSortBy = (e.target as ISortByEventTarget).getAttribute(
      DATA_SORT_BY
    ) as TSortingValues;
    if (currentSortBy !== null) {
      onSortingChange(currentSortBy);
    }
  };

  const handleSortDirectionClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const currentSortDirection = (e.target as ISortByEventTarget).getAttribute(
      DATA_SORT_DIRECTION
    ) as TDirectionValues;
    if (currentSortDirection !== null) {
      onDirectionChange(currentSortDirection);
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={cn('catalog-sort__type-button', {
            'catalog-sort__type-button--active': sorting === SORT_BY.Date,
          })}
          aria-label="по дате"
          data-sort-by="date"
          onClick={handleSortByClick}
        >
          по дате
        </button>
        <button
          className={cn('catalog-sort__type-button', {
            'catalog-sort__type-button--active': sorting === SORT_BY.Price,
          })}
          aria-label="по цене"
          data-sort-by="price"
          onClick={handleSortByClick}
        >
          по цене
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={cn(
            'catalog-sort__order-button',
            'catalog-sort__order-button--up',
            {
              'catalog-sort__order-button--active':
                direction === SORT_DIRECTION.Asc,
            }
          )}
          aria-label="По возрастанию"
          data-sort-direction="asc"
          onClick={handleSortDirectionClick}
        ></button>
        <button
          className={cn(
            'catalog-sort__order-button',
            'catalog-sort__order-button--down',
            {
              'catalog-sort__order-button--active':
                direction === SORT_DIRECTION.Desc,
            }
          )}
          aria-label="По убыванию"
          data-sort-direction="desc"
          onClick={handleSortDirectionClick}
        ></button>
      </div>
    </div>
  );
}

export { Sort };
