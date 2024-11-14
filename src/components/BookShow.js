import { useState } from "react";
import BookEdit from "./BookEdit";
import useBooksContext from "../hooks/use-books-context";

function BookShow({book}) {
  const {deleteBookById} = useBooksContext()
  const [showEdit, setShowEdit] = useState(false);
  const handleEdit = () => {
    setShowEdit(!showEdit);
  };
  const handleClick = () => {
    deleteBookById(book.id);
  };
  const handleSubmit = ()=>{
    setShowEdit(false)
  }

  let content = <h3>{book.title}</h3>;
  if (showEdit) {
    content = (
      <BookEdit key={book.id} book={book} onSubmit={handleSubmit} />
    );
  }
  return (
    <div className="book-show">
      <img alt='books' src={`https://picsum.photos/seed/${book.id}/300/200`} />
      <div>{content}</div>
      <div className="actions">
        <button onClick={handleEdit} className="edit">
          Edit
        </button>
        <button className="delete" onClick={handleClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookShow;
