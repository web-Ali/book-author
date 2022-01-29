import React from 'react';
import photo from "../../../../assets/images/unnamed.png";
import style from "./BookList.module.css";
// import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {BOOK_ROUTE, SEARCH_BOOK_ROUTER} from "../../../../routing/consts";
import {httpOnHttps} from "../../../../utils/customFunc";
import ModalAccept from "../../../UI/ModalAccept";

// const renderTooltip = (props) => (
//     <Tooltip id="button-tooltip" {...props}>
//         Рецензии
//     </Tooltip>
// );

const BookListItem = ({book,verify,requestBooks,deleteBook}) => {

    const verifyRequest = async (name, id)=> {
        await verify(name, id);
        requestBooks();
    }
    return (
        <div className={style.bookList}>
            <div className="row">
                <div className="col-sm-3 col-12 text-center text-sm-start">
                    <div className="img">
                        <NavLink to={BOOK_ROUTE + '/' + book.id}><img className={style.img}
                                                                      src={book?.cover ? httpOnHttps(book.cover) : photo}
                                                                      alt=""/></NavLink>
                    </div>
                </div>
                <div className="col-sm-9 col-12 pt-4 ">
                    {
                        book.verified === false &&
                        <div className='fst-italic'>Attention! The work is available only to you
                            <ModalAccept
                                button={<button  className='p-1 ms-3 btn btn-danger' >Delete book</button>}
                                text= {'Are you sure you want to delete the book?'}
                                desc={'After deletion, it will be impossible to return the book! The book will be permanently deleted!'}
                                call={()=>deleteBook(book.id)}
                            />

                        <hr/>

                        </div>
                    }
                    {
                        book.on_verification === false &&
                        <div className='text-danger'><p>The work must be sent for verification. Make sure you own the copyright for this work before submitting it for review.</p>
                            <div className='d-flex justify-content-between mt-5'>
                                <NavLink to={BOOK_ROUTE + '/' + book.id}> <button className='btn btn-success me-4'>
                                    <i className="fas fa-edit"/> Open</button></NavLink>
                                <button onClick={() => verifyRequest(localStorage.getItem('username'),book.id)} className='btn btn-primary me-2'>
                                    <i className="fas fa-share" /> Send for verification</button></div>

                            <hr/></div>
                    }
                    {
                        book.on_verification === true &&
                        <div className='text-success'>The book is still to be checked by site moderation <hr/></div>
                    }

                    <NavLink to={BOOK_ROUTE + '/' + book.id}><h3>{book.name}</h3></NavLink>
                    <p >
                        <span style={{fontSize: 16}} className='fw-bold'>{book.age_limit ? book.age_limit + '+, ' : null}</span>

                        {book?.form?.form}/ {Array.isArray(book.genre) && book.genre.map((g, index) => {
                        if (index === 0) {
                            return g.genre
                        }
                        return ', ' + g.genre
                    })}
                    </p>
                    <div className={style.statistic + ' d-flex justify-content-start mt-2'}>
                        <div>
                            <i className="fa fa-eye" aria-hidden="true"/> {book.views}
                        </div>
                        <div>
                            <i className="far fa-heart"/> {book.likes}
                        </div>
                        {/*<div>*/}
                        {/*<i className="fas fa-comments" />*/}
                        {/*13*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*<OverlayTrigger*/}
                        {/*placement="right"*/}
                        {/*delay={{show: 250, hide: 400}}*/}
                        {/*overlay={renderTooltip}*/}
                        {/*>*/}
                        {/*<i className="fas fa-feather-alt"></i>*/}
                        {/*</OverlayTrigger>*/}
                        {/*2*/}
                        {/*</div>*/}
                    </div>
                    <div className={style.bookText + ' mt-3'}>
                        {book.description}
                    </div>
                </div>
            </div>
            <hr/>
            <div style={{backgroundColor: 'lightgray', height: '10px'}} />
            <hr/>
        </div>
    );
};

export default BookListItem;