import React from 'react';
import BookListItem from "./BookListItem";
import {isEmptyObj} from "../../../../utils/customFunc";
import style from "./BookList.module.css";




const BookList = ({books,verify,requestBooks, deleteBook}) => {
    return (
        <div className={style.bookListContainer +' container'}>
            {isEmptyObj(books)
                ?
                <div>У вас нет произведений</div>
                :
                books.map((a)=>{
                    return <BookListItem deleteBook={deleteBook} requestBooks={requestBooks} key={a.id} book={a} verify={verify}/>
                })
            }

        </div>
    );
};

export default BookList;