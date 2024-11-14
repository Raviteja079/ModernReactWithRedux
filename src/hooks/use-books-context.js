import BookContext from "../context/books";
import { useContext } from "react";

function useBooksContext(){
    return useContext(BookContext)
}

export default useBooksContext