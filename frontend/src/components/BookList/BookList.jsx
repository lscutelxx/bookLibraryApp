import { useDispatch, useSelector } from 'react-redux';
import './BookList.css';
// import { deleteBook, toggleFavourite } from '../../redux/books/actionCreators';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import {
  selectAuthorFilter,
  selectOnlyFavouriteFilter,
  selectTitleFilter,
} from '../../redux/slices/filterSlice';
import { deleteBook, toggleFavourite } from '../../redux/slices/booksSlices.js';
import { selectBooks } from '../../redux/slices/booksSlices';

const BookList = () => {
  const books = useSelector(selectBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavouriteFilter = useSelector(selectOnlyFavouriteFilter);
  const dispatch = useDispatch();

  const deleteBookHandler = (id) => {
    dispatch(deleteBook(id));
  };

  const toggleFavouriteHandler = (id) => {
    dispatch(toggleFavourite(id));
  };

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavourite = onlyFavouriteFilter ? book.isFavourite : true;
    return matchesTitle && matchesAuthor && matchesFavourite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regexp = new RegExp(`(${filter})`, 'gi');
    return text.split(regexp).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {!books.length ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {highlightMatch(book.title, titleFilter)} by{' '}
                <strong>{highlightMatch(book.author, authorFilter)}</strong>
              </div>
              <div className="book-actions">
                <span onClick={() => toggleFavouriteHandler(book.id)}>
                  {book.isFavourite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button onClick={() => deleteBookHandler(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
