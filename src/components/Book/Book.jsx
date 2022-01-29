import React, {useState} from 'react';
import photo from "../../assets/images/unnamed.png";
import style from "./Book.module.css"
import "./Book.css"
import {Tabs, Tab} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {
    ADD_CHAPTER_ROUTER,
    EDIT_BOOK_ROUTE,
    READER_ROUTER, SEARCH_BOOK_ROUTER, USER_ROUTE
} from "../../routing/consts";
import jwtDecode from "jwt-decode";
import ModalEditPhoto from "../UI/ModalEditPhoto";
import BookComments from "./BookComments";
import {httpOnHttps} from "../../utils/customFunc";
import StatisticsContainer from "../../containers/Statistics/StatisticsContainer";
import DatePicker from 'react-date-picker';
import ModalAccept from "../UI/ModalAccept";

const Book = (props) => {

        const [dateStart, setDateStart] = useState(new Date())
        const [dateEnd, setDateEnd] = useState(new Date())

// const renderTooltip = (props) => (
//     <Tooltip id="button-tooltip" {...props}>
//         Рецензии
//     </Tooltip>
// );
        let chapterId = props.data.chapters.find((item) => item.paid === false)


        const liked = () => {
            props.liked(props.data.id)
        };
        const noLiked = () => {
            props.noLiked(props.data.id)
        };
        if (props.error) {
            return (
                <div className='text-center mt-5    '>
                    <h1>{props.error}</h1>
                </div>
            )
        }

        const deletedChapterCall = (chapterid) => {
            return () => props.deletedChapter(props.data.id, chapterid)
        }
        return (
            <div>


                <div>
                    <div className={style.wrapper}>
                        <div className="row pb-5 m-0">
                            <div className="col-lg-2 col-12">
                                <div className={style.contImg}>
                                    <img className={style.bookImg}
                                         src={props.data && props.data.cover ? httpOnHttps(props.data.cover) : photo}
                                         alt=""/>
                                    <div className={style.photoEdit}>

                                        {localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).user_id === props.data.user?.id ?
                                            <ModalEditPhoto savePhoto={props.savePhoto} id={props.data.id}/>
                                            : null
                                        }

                                    </div>
                                </div>
                                <div>
                                    {
                                        chapterId ? <div className='ps-3 mt-3 mb-3'>

                                                <NavLink
                                                    to={READER_ROUTER + '/' + props.data.id + '/' + chapterId.pk}>
                                                    <button className='btn btn-primary w-100  '>
                                                        <i className="fas fa-book"/> Start Read
                                                    </button>
                                                </NavLink>
                                            </div>
                                            :
                                            null
                                    }

                                </div>
                                {
                                    localStorage.getItem('token') &&
                                    jwtDecode(localStorage.getItem('token')).user_id === props.data.user?.id &&
                                    props.data.on_verification !== true
                                        ?
                                        <div>

                                            <div className='ps-3 mt-3 mb-3'>
                                                <NavLink to={EDIT_BOOK_ROUTE + '/' + props.data.id}>
                                                    <button className='btn btn-success w-100  '>
                                                        <i className="fas fa-edit"/> Edit
                                                    </button>
                                                </NavLink>
                                            </div>
                                            <div className='ps-3 mt-3 mb-3'>
                                                <NavLink to={'#'}>
                                                    <button className='btn btn-warning w-100  '>
                                                        <i className="fas fa-arrow-up"/> PROMOTE
                                                    </button>
                                                </NavLink>
                                            </div>
                                        </div>
                                        : props.data.price ? <div>

                                            <div className='ps-3 mt-3 mb-3'>

                                                <button className='btn btn-success w-100  '>
                                                    Buy | {props.data.price}$
                                                </button>

                                            </div>
                                        </div> : null

                                }

                                {props.data.is_bookmarked ?
                                    <div className='ps-3 mt-3 mb-3'>

                                        <button onClick={() => {
                                            props.deleteBookmark(props.data.id)
                                        }} className='btn btn-outline-success w-100  '>
                                            Added <i className="fas fa-star"/>
                                        </button>

                                    </div>
                                    :
                                    <div className='ps-3 mt-3 mb-3'>
                                        {localStorage.getItem('token') &&
                                        <button onClick={() => {
                                            props.bookmark(props.data.id)
                                        }} className='btn btn-outline-dark w-100  '>
                                            <i className="fas fa-plus"/> To bookmarks
                                        </button>
                                        }


                                    </div>

                                }


                            </div>
                            <div className="col-lg-10 col-12  p-lg-0 p-4 pt-lg-4 ">
                                {
                                    props.data.verified === false &&
                                    <div className='fst-italic'>Attention! The work is available only to you
                                        <hr/></div>
                                }
                                {
                                    props.data.on_verification === false &&
                                    <div className='text-danger'><p>The work must be sent for verification. Make sure you
                                        own the copyright for this work before submitting it for review.</p>
                                        <div className='text-end mt-5'>

                                            <button onClick={() => props.verify(props.data.id)}
                                                    className='btn btn-primary me-2'>
                                                <i className="fas fa-share"/> Send for verification
                                            </button>
                                        </div>

                                        <hr/>
                                    </div>
                                }
                                {
                                    props.data.on_verification === true &&
                                    <div className='text-success'>The book is still to be checked by site moderation <hr/>
                                    </div>
                                }
                                <div className='d-flex justify-content-between'>
                                    <h3>{props.data.name}</h3>
                                    <div className='text-secondary me-4 fst-italic'>{props.data.date}</div>
                                </div>
                                <div>Author: <Link to={USER_ROUTE + '/' + props.data.user.username}>
                                    <h5>{props.data.user.fullname}</h5></Link></div>
                                <p className={style.ganr}>
                                    <span style={{fontSize: 20}}
                                          className='fw-bold'>{props.data.age_limit ? props.data.age_limit + '+, ' : null}</span>

                                    <Link
                                        to={SEARCH_BOOK_ROUTER + '/' + props.data?.form?.id + '/0/0/0/'}>{props.data?.form?.form}</Link>/ {Array.isArray(props.data.genre) && props.data.genre.map((g, index) => {
                                    if (index === 0) {
                                        return <Link key={g.id}
                                                     to={SEARCH_BOOK_ROUTER + '/0/' + g.id + '/0/0/'}>{g.genre}</Link>
                                    }
                                    return <span key={g.id}>, <Link key={g.id}
                                                                    to={SEARCH_BOOK_ROUTER + '/0/' + g.id + '/0/0/'}>{g.genre}</Link></span>
                                })}


                                </p>

                                <div className={style.statistic + ' d-flex justify-content-start mt-2 mb-2'}>
                                    <div>
                                        <i className="fa fa-eye" aria-hidden="true"/> {props.data.views}

                                    </div>
                                    <div>
                                        {props.data.is_liked ?
                                            <div><span onClick={noLiked}><i className="fas fa-heart"
                                                                            style={{color: 'red'}}/></span> {props.data.likes}
                                            </div>
                                            :
                                            <div><span onClick={liked}><i
                                                className="far fa-heart"/></span> {props.data.likes}
                                            </div>


                                        }
                                    </div>

                                    <div>
                                        {/*<i className="fas fa-comments"/> {props.comments}*/}
                                    </div>
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
                                <div className='mb-2'>
                                    {props.data.finished ?
                                        <div style={{cursor: 'default'}} className='btn btn-primary p-1 '><i
                                            className="fas fa-check"/> The work is finished</div> :
                                        <div style={{cursor: 'default'}} className='btn btn-warning p-1'><i
                                            className="fas fa-feather"/> The work is not finished</div>
                                    }
                                </div>

                                <div className={style.tags}>
                                    {Array.isArray(props.data.tags) && props.data.tags.map((g) => {
                                        return <span key={g.id}>#{g.tag} </span>
                                    })}
                                </div>
                                <div className={style.bookText + ' mt-3'}>


                                </div>
                                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3 mt-4">
                                    <Tab eventKey="home" title="Annotation">
                                        {props.data.description}
                                    </Tab>
                                    <Tab eventKey="profile" title="Contents">
                                        <div className=''>
                                            {props.data.chapters ? props.data.chapters.map(a => <div key={a.pk}>
                                                    {
                                                        (
                                                            !props.data.paid ||
                                                            !a.paid ||
                                                            (localStorage.getItem('token') &&
                                                                jwtDecode(localStorage.getItem('token')).user_id === props.data.user?.id) ||
                                                            false
                                                        )
                                                            ?
                                                            (

                                                                <p className={style.chapterTitle + ' mb-2 '}>
                                                                    <>
                                                                        <NavLink
                                                                            to={READER_ROUTER + '/' + props.data.id + '/' + a.pk}>{a.name}
                                                                        </NavLink>
                                                                        <span style={{
                                                                            fontSize: 11,
                                                                            color: 'gray',
                                                                            display: 'inline-block',
                                                                            marginLeft: 12
                                                                        }}>{a.created.substr(0, 10)}</span>
                                                                    </>
                                                                </p>
                                                            )
                                                            : (<>
                                                                    <p className={style.chapterTitle + ' mb-2 text-secondary'}>
                                                                        {a.name} <i className="fa fa-lock"
                                                                                    aria-hidden="true"/>
                                                                        <span style={{
                                                                            fontSize: 11,
                                                                            color: 'gray',
                                                                            display: 'inline-block',
                                                                            marginLeft: 12
                                                                        }}> {a.created.substr(0, 10)}</span>
                                                                    </p>
                                                                </>

                                                            )
                                                    }
                                                    {localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).user_id === props.data.user?.id ?
                                                        <ModalAccept
                                                            button={<span style={{cursor: 'pointer'}}
                                                                          className=" ms-2 mt-2  text-danger">x </span>}
                                                            text={'Are you sure you want to delete the chapter?'}
                                                            desc={'The chapter will be permanently deleted!'}
                                                            call={deletedChapterCall(a.pk)}
                                                        />
                                                        : ''
                                                    }


                                                </div>)


                                                : null}
                                            {localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).user_id === props.data.user?.id ?
                                                <NavLink to={ADD_CHAPTER_ROUTER + '/' + props.data.id}><p
                                                    className='text-success mb-2'>Add chapter</p></NavLink>
                                                : ''
                                            }
                                        </div>
                                    </Tab>
                                    {
                                        localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).user_id === props.data.user?.id ?
                                            <Tab eventKey="contact" title="Statistics"
                                                 className='text-sm-center text-start'>
                                                <div className='d-inline-block'>
                                                    <span style={{fontStyle: 'italic', fontSize: 22,}}>Start: </span>
                                                    <DatePicker
                                                        className='me-4 stats'
                                                        onChange={setDateStart}
                                                        value={dateStart}
                                                    />
                                                </div>
                                                <div className='d-inline-block'>
                                                    <span style={{fontStyle: 'italic', fontSize: 22,}}>End: </span>
                                                    <DatePicker
                                                        className='me-4 stats'
                                                        onChange={setDateEnd}
                                                        value={dateEnd}
                                                    />
                                                </div>
                                                {
                                                    props.data.id ?
                                                        <StatisticsContainer
                                                            start={dateStart.getFullYear() + '.' + (dateStart.getMonth() + 1) + '.' + dateStart.getDate()}
                                                            end={dateEnd.getFullYear() + '.' + (dateEnd.getMonth() + 1) + '.' + dateEnd.getDate()}
                                                            book={props.data.id}/>
                                                        : null
                                                }

                                            </Tab>
                                            : null
                                    }

                                </Tabs>
                            </div>
                        </div>

                    </div>
                    <div className={style.wrapper}>
                        <BookComments deleteThisComment={props.deleteThisComment} comments={props.comments}
                                      bookId={props.data.id} addComment={props.addComment}/>
                    </div>
                </div>

            </div>
        );
    }
;

export default Book;