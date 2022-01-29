import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import style from './Header.module.css';
import logo from '../../assets/images/logo.png';
import {Link, NavLink} from "react-router-dom";
import {
    ADD_BOOKS_ROUTER, MY_BLOG_ROUTER,
    MY_BOOKS_ROUTER,
    MY_LIBRARY_ROUTER,
    MY_PROFILE_EXIT_ROUTER,
    MY_PROFILE_INFO, SEARCH_BLOG_ROUTER, SEARCH_BOOK_ROUTER, STATS_ALL_ROUTER
} from "../../routing/consts";
import ModalAuth from "./ModalAuth";
import profilePhoto from '../../assets/images/profile.jpg'
import {httpOnHttps} from "../../utils/customFunc";
import NotificationsContainer from "../../containers/Header/NotificationsContainer";


const Header = ({data, newNotifications}) => {

    const [showSearch, setShowSearch] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchRow, setSearchRow] = useState('');

    let history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        history.push(SEARCH_BOOK_ROUTER + '/0/0/' + searchRow + '/0/0');
    }

    function IsAuth() {
        if (localStorage.getItem('username') === data.username) {
            return <>

                {/*<div className={style.auth}>*/}
                {/*    <i className="fas fa-comments"/>*/}
                {/*</div>*/}

                <div className={style.auth}>
                    <i style={newNotifications.length > 0 ? {cursor: 'pointer', color: 'yellow'} : {cursor: 'pointer'}}
                       onClick={() => setShowNotifications(true)}
                       className="fas fa-bell"/>
                    {showNotifications ? <NotificationsContainer offModal={setShowNotifications}/>
                        : null
                    }
                </div>

                <div className={style.auth + ' ' + style.avatar}>
                    <img src={data.image ? httpOnHttps(data.image) : profilePhoto} alt=""/>
                    <div className={style.avatarNav}>
                        <Link to={MY_PROFILE_INFO}>
                            <div style={{borderBottom: '1px solid #e6f0fc'}}><i className="fas fa-user"/> My profile
                            </div>
                        </Link>
                        <Link to={MY_BLOG_ROUTER}>
                            <div><i className="fas fa-feather-alt"/> My blog</div>
                        </Link>
                        <Link to={MY_BOOKS_ROUTER}>
                            <div><i className="fas fa-book"/> My books</div>
                        </Link>
                            {/*<Link to={ADD_BOOKS_ROUTER}>*/}
                            {/*    <div><i className="fas fa-plus"/> Add book</div>*/}
                            {/*</Link>*/}
                        <Link to={MY_LIBRARY_ROUTER}>
                            <div><i className="fas fa-book-reader"/> My library</div>
                        </Link>
                        <Link to={STATS_ALL_ROUTER}>
                            <div><i className="fas fa-chart-line"/> Statistics</div>
                        </Link>
                        <Link to={MY_PROFILE_EXIT_ROUTER}>
                            <div className='text-danger' style={{borderTop: '3px solid #e6f0fc'}}><i
                                className="fas fa-sign-out-alt"/> Exit
                            </div>
                        </Link>
                    </div>
                </div>
            </>
        } else {
            return <div className={style.auth}><ModalAuth/></div>
        }
    }

    return (
        <div className={style.header + ' container-fluid'}>
            <div className="container">

                <div className="row justify-content-between">
                    <div className="col-md-7 col-lg-8 col-12 text-center">
                        <nav className={style.nav}>

                            <ul className='d-flex justify-content-center justify-content-sm-start ps-0'>
                                <li className={style.logo}>
                                    <NavLink to={'/'}><img src={logo} alt=""/></NavLink>
                                </li>
                                <li><NavLink to={SEARCH_BOOK_ROUTER}> Books </NavLink>
                                    <ul>
                                        <li></li>
                                    </ul>
                                </li>
                                {/*<li><NavLink to={SEARCH_USER_ROUTER}> Authors </NavLink>*/}
                                {/*    <ul>*/}
                                {/*        <li></li>*/}
                                {/*    </ul>*/}
                                {/*</li>*/}
                                <li><NavLink to={SEARCH_BLOG_ROUTER}>Community</NavLink></li>

                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-5 col-lg-4 col-12 end text-center">
                        <div className={'d-flex justify-content-center justify-content-sm-end ' + style.navRight}>
                            <div className={style.auth}>
                                {
                                   (localStorage.getItem('username') === data.username) ?
                                       <Link to={ADD_BOOKS_ROUTER}>
                                    <span className={style.addBook}>
                                           <i className="fas fa-plus"/> Add book
                                    </span>
                                       </Link> : null
                                }

                                <div className={style.searchRow + ' ' + (showSearch ? '' : style.hide)}>
                                    <form onSubmit={handleSubmit}>
                                        <i className="fas fa-search"/>
                                        <input value={searchRow} onChange={(e) => setSearchRow(e.target.value)}
                                               type="text"/>
                                        <span style={{cursor: 'pointer'}} onClick={() => {
                                            setShowSearch(!showSearch);
                                            setSearchRow('')
                                        }}>
                                                    <i className="fas fa-times"/>
                                                </span>
                                    </form>
                                </div>
                                <span className='d-inline-block' onClick={() => {
                                    setShowSearch(!showSearch);
                                    setSearchRow('')
                                }} style={{cursor: 'pointer'}}>
                                        <i className="fas fa-search"/>
                                        </span>
                            </div>

                            <IsAuth/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;