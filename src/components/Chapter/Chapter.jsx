import React, {useEffect} from 'react';
import './style.css';
import photo from "../../assets/images/unnamed.png";
import Loader from "../Loader/Loader";
import {Link, NavLink} from "react-router-dom";
import {BOOK_ROUTE, EDIT_CHAPTER_ROUTER, READER_ROUTER} from "../../routing/consts";
import jwtDecode from "jwt-decode";
import style from './Chapter.module.css'

const Chapter = ({data, error, isFetching, bookId, chapterid, bookData}) => {

    const [scroll, setScroll] = React.useState(0);
    const [oldScroll, setOldScroll] = React.useState(0);
    const [showHead, setShowHead] = React.useState('');
    const [showSidebar, setShowSidebar] = React.useState(() => style.out);



    useEffect(()=>{

        if (data.markdown && error === ''){

            let socket = new WebSocket(`wss://analytics.worldofwriter.com/ws/${bookId}/${chapterid}/?token=${localStorage.getItem('token')}`);
            setInterval(()=>socket.close(1000,'text'),300000)
            return () =>{
                socket.close(1000, 'text')
            }
        }

    },[data])




    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    useEffect(() => {
        if (oldScroll < scroll) {
            setShowHead(() => style.out)
        } else {
            setShowHead('')
        }
        setOldScroll(scroll);
    }, [scroll]);

    let chapterPk = bookData.chapters.findIndex(el => el.pk == chapterid);
    let next, prev;
    if (chapterPk === 0) {
        prev = null;
        next = bookData.chapters.find((el, index) => index === 1);
    } else if (bookData.chapters.length - 1 === chapterPk) {
        prev = bookData.chapters.find((el, index) => index === chapterPk - 1);
        next = null;
    } else {
        prev = bookData.chapters.find((el, index) => index === chapterPk - 1);
        next = bookData.chapters.find((el, index) => index === +chapterPk + 1);
    }






    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className={style.chapterCont}>
            <div className={showSidebar + ' ' + style.sidebare}>
                <div className={style.sidebarContent}>
                    <div className={style.sidebarTitle}>
                        <h3>{bookData.name}</h3>
                        <div className={style.chapterimg}>
                            <img src={bookData.cover ? bookData.cover : photo} alt=""/></div>
                        <p>Содержание: </p>
                        <button onClick={() => {
                            setShowSidebar(() => style.out);
                            window.scrollTo(0, 0);
                        }} className={' btn btn-secondary '}>
                            <i className="fas fa-times"/>
                        </button>
                    </div>
                    <div className={style.chapters}>
                        {bookData.chapters.map(a => {
                            if (chapterid == a.pk) {
                                return <div className={style.active} key={a.pk}>
                                    <i className="fas fa-caret-right"/> {a.name}</div>
                            }
                            return <NavLink key={a.pk} to={READER_ROUTER + '/' + bookId + '/' + a.pk}>
                                <div
                                    onClick={() => {
                                        setShowSidebar(() => style.out)
                                        window.scroll(0, 0)
                                    }}
                                    key={a.pk}>{a.name}
                                </div>
                            </NavLink>
                        })}


                    </div>
                </div>
            </div>
            <div className={style.nav + ' pt-3 ps-3 pb-3 ' + showHead}>
                <button onClick={() => setShowSidebar('')} className={' btn btn-secondary me-3'}>
                    <i className="fa fa-list-ul" aria-hidden="true"/> <span>Contents</span>
                </button>


                <NavLink to={BOOK_ROUTE + '/' + bookId}>
                    <button className='btn btn-secondary me-3 mt-sm-0 mt-1'>
                        <i className="fa fa-book" aria-hidden="true"/> Back to book
                    </button>
                </NavLink>
                {localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).user_id === bookData?.user.id ?

                    <NavLink to={EDIT_CHAPTER_ROUTER + '/' + bookId + '/' + chapterid}>
                        <button className=' btn btn-success  me-3 mt-sm-0 mt-1'>
                            <i className="fas fa-edit"/> Edit chapter
                        </button>
                    </NavLink>
                    :
                    ''}
            </div>

            <div className=" ck-content container " >
                <div className='position-relative'>
                    <h2 className='text-center fst-italic mb-5 mt-5'>{data.name}</h2>
                </div>


                {isFetching ? <div><Loader/></div> : null}
                {error}
                <div dangerouslySetInnerHTML={{__html: data.markdown}}/>


                <hr/>
            </div>

            <div className='position-relative container' style={{paddingBottom: 40}}>
                <div className={style.move}>
                    <Link onClick={e=> prev ? window.scroll(0, 0) : e.preventDefault()} to={READER_ROUTER + '/' + bookId + '/' + prev?.pk}>
                        <button className={style.rightMove + ' btn'}>
                            <i className={prev ? 'fas fa-arrow-left ' : 'fas fa-arrow-left d-none'}/>
                        </button>
                    </Link>


                    <Link onClick={e=> next ? window.scroll(0, 0) : e.preventDefault()}  to={READER_ROUTER + '/' + bookId + '/' + next?.pk}>
                        <button className={style.leftMove + ' btn'}><i className={next ? 'fas fa-arrow-right ' : 'fas fa-arrow-right d-none' } /></button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Chapter;