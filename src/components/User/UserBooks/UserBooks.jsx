import React from 'react';
import {isEmptyObj} from "../../../utils/customFunc";
import UserBooksItem from "./UserBooksItem";
import style from "../../Profile/MyBooks/BookList/BookList.module.css";

const UserBooks = ({books}) => {
    return (
        <div className={style.bookListContainer +' container'}>
            {isEmptyObj(books)
                ?
                <div>The user has no artwork</div>
                :
                books.map((a)=>{
                    return <UserBooksItem  key={a.id} book={a} />
                })
            }
        </div>
    );
};

export default UserBooks;