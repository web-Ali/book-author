import React from 'react';
import style from './MyLibrary.module.css'
import photo from "../../../assets/images/unnamed.png";
import {NavLink} from "react-router-dom";
import {BOOK_ROUTE} from "../../../routing/consts";

const MyLibrary = (props) => {
    return (
        <div>
            <h2>Bookmarks</h2>
            <hr/>
            <div className='row pb-5'>
                {
                    Array.isArray(props.data) ? props.data.map((mark) => {
                        return <div className="col-sm-3 col-6 text-center" key={mark.id}>
                            <NavLink to={BOOK_ROUTE+'/'+mark.id}>

                                <img className={style.img}
                                     src={ mark?.cover ? process.env.REACT_APP_API_URL_NO_SLASH + mark.cover : photo } alt=""/>

                                <p className={style.title}>{mark.name}</p>
                            </NavLink>
                        </div>
                    }) : <div>
                        You don't have any bookmarks
                    </div>
                }


            </div>
        </div>
    );
};

export default MyLibrary;