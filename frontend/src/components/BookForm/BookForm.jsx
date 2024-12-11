import { useState } from 'react';
import axios from 'axios';
import './BookForm.css';
import { useDispatch } from 'react-redux';
// import { addBook } from '../../redux/books/actionCreators';
import booksData from '../../data/books.json';
import createBookWithId from '../../utils/createBookWithId';
import { addBook } from '../../redux/slices/booksSlices';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      //dispatch action
      const book = createBookWithId({ title, author });

      dispatch(addBook(book));

      setAuthor('');
      setTitle('');
    }
  };

  const addRandomBookHandler = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    const randomBookWithId = createBookWithId(randomBook);

    dispatch(addBook(randomBookWithId));
  };

  const addRandomBookViaAPIHandler = async () => {
    try {
      const res = await axios.get('http://localhost:4000/random-book');
      if (res?.data?.title && res?.data?.author) {
        dispatch(addBook(createBookWithId(res.data)));
      }
    } catch (error) {
      console.log('Error fetching random book', error);
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={addRandomBookHandler}>
          Add Random
        </button>
        <button type="button" onClick={addRandomBookViaAPIHandler}>
          Add random by API
        </button>
      </form>
    </div>
  );
};

export default BookForm;
