import { createContext, useCallback } from "react";
import { useState } from "react";
import axios from "axios";

const BookContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);
  const fetchBooks = useCallback(async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  },[]);

  const deleteBookById = (id) => {
    axios.delete(`http://localhost:3001/books/${id}`);
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };
  const updateBookById = async (title, id) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: title,
    });
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };
  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });
    setBooks([
      ...books,
      {
        id: response.data.id,
        title: response.data.title,
      },
    ]);
  };

  const valueToShare = {
    books,
    deleteBookById,
    updateBookById,
    createBook,
    fetchBooks,
  };

  return (
    <BookContext.Provider value={valueToShare}>{children}</BookContext.Provider>
  );
}

export default BookContext;
export { Provider };
