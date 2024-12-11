import { useDispatch, useSelector } from 'react-redux';
import {
  selectTitleFilter,
  resetFilters,
  setTitleFilter,
  selectAuthorFilter,
  setOnlyFavouriteFilter,
  selectOnlyFavouriteFilter,
  setFilterAuthor,
} from '../../redux/books/slices/filterSlice';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavouriteFilter = useSelector(selectOnlyFavouriteFilter);

  const titleFilterChangeHandler = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const resetFiltersHandler = () => {
    dispatch(resetFilters());
  };

  const onlyFavouriteFilterHandler = () => {
    dispatch(setOnlyFavouriteFilter());
  };

  const authorFilterHandler = (e) => {
    dispatch(setFilterAuthor(e.target.value));
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title..."
            onChange={titleFilterChangeHandler}
            value={titleFilter}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by author..."
            value={authorFilter}
            onChange={authorFilterHandler}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlyFavouriteFilter}
              onChange={onlyFavouriteFilterHandler}
            />
            Only Favourite
          </label>
        </div>
        <button type="button" onClick={resetFiltersHandler}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
