import React, {useState} from 'react';
import style from "../Book/Book.module.css";
import ProfileCommentsItem from "./ProfileCommentsItem";

const ProfileComments = (props) => {
    const [commentState, setComment]= useState('');
    const send = (comment, parent) =>{
        const formData = new FormData();
        formData.append('text', comment);
        setComment('')
        if (parent !== undefined) {
            formData.append('parent', parent);
        }
        props.addComment(props.username,formData)
    };

    return (
        <div className={style.commentsWrapper + ' container ps-sm-4 pe-sm-4 ps-0 pe-0'}>
            <h4 className='p-sm-2 p-0'><i className="fas fa-comments" /> Guest book</h4>
            <div className='p-sm-4 p-0 ms-0'>
                <textarea onChange={(e)=>setComment(e.target.value)} value={commentState}  className="form-control" rows="3"/>
                <button onClick={()=>send(commentState)} className='btn btn-primary mt-2'>Сomment</button>
            </div>

            {
                props.comments.length ? props.comments.map((item) => {
                    return  <ProfileCommentsItem key={item.id} item={item} username={props.username} addCom={send} deleteThisComment={props.deleteThisComment}/>
                }) : null
            }
        </div>
    );
};

export default ProfileComments;