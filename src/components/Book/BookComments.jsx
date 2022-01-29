import React, {useState} from 'react';
import BookCommentsItem from "./BookCommentsItem";
import style from "./Book.module.css";

const BookComments = (props) => {
    const [commentState, setComment]= useState('');
    const send = (comment, parent) =>{
        const formData = new FormData();
        formData.append('text', comment);
        setComment('')
        if (parent !== undefined) {
            formData.append('parent', parent);
        }
        props.addComment(props.bookId,formData)
    };

    return (
        <div className={style.commentsWrapper}>
            <h4 className='p-2'><i className="fas fa-comments" /> Comments</h4>
            <div className='p-4'>
                <textarea onChange={(e)=>setComment(e.target.value)} value={commentState}  className="form-control" rows="3"/>
                <button onClick={()=>send(commentState)} className='btn btn-primary mt-2'>Сomment</button>
            </div>

            {
                props.comments.length ? props.comments.map((item) => {
                    return  <BookCommentsItem key={item.id} bookId={props.bookId} item={item} addCom={send} deleteThisComment={props.deleteThisComment}/>
                }) : null
            }
        </div>
    );
};

export default BookComments;