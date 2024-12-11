import { useDispatch, useSelector } from 'react-redux';
import {
  selectTitleFilter,
  resetFilters,
  setTitleFilter,
} from '../../redux/books/slices/filterSlice';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);

  const titleFilterChangeHandler = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const resetFiltersHandler = () => {
    dispatch(resetFilters());
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
        <button type="button" onClick={resetFiltersHandler}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
