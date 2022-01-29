import React, {useEffect, useState} from 'react';
import {NavLink, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import bg from "../../assets/images/default-bg.jpg";
import style from "./Profile.module.css";
import photo from "../../assets/images/profile.jpg";
import MyLibraryContainer from "../../containers/Profile/MyLibraryContainer";
import ModerationContainer from "../../containers/Profile/ModerationContainer";
import ModalEditProfilePhoto from "../UI/ModalEditProfilePhoto";
import {
    ADD_BOOKS_ROUTER,
    MODERATION_ROUTER, MY_BLOG_ROUTER,
    MY_BOOKS_ROUTER,
    MY_LIBRARY_ROUTER, MY_PROFILE_EXIT_ROUTER, MY_PROFILE_INFO,
} from "../../routing/consts";
import BookListContainer from "../../containers/Profile/BookListContainer";
import AddBookContainer from "../../containers/Profile/AddBookContainer";
import Exit from "./Exit";
import ModalBackground from "../UI/ModalBackground";
import MyProfile from "./MyProfile/MyProfile";
import {httpOnHttps} from "../../utils/customFunc";
import AdvertisingContainer from "../../containers/Advertising/AdvertisingContainer";
import AuthorContainer from "../../containers/Main/AuthorContainer";
import BlogContainer from "../../containers/Profile/MyBlogContainer";
import ProfileComments from "./ProileComments";

const Profile = (props) => {

    const ProfileInfoComponent = () => {
        return <MyProfile updateProfile={props.updateProfile} requestUser={props.requestUser} user={props.data}/>
    };

    return (
        <>
            <div className="container ">
                <div style={{backgroundImage: `url(${props.data.cover ? httpOnHttps(props.data.cover) : bg})`}}
                     className={style.coverBg}>
                    <div className="row pt-5 pb-5 align-items-lg-end align-items-start position-relative">
                        <div className="col-sm-2 col-3">
                            <div className={style.profImg}>
                                <img src={props.data.image ? httpOnHttps(props.data.image) : photo} alt=""/>
                                <div className={style.photoEdit}>
                                    <ModalEditProfilePhoto savePhoto={props.savePhoto} username={props.data.username}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-10 col-9">
                            <h1 style={{color: "#fff"}}>{props.data.fullname} </h1>
                            <div className={style.userStats}>
                                <div> Likes <b>{props.data.likes}</b></div>
                                <div> Subscribers <b>{props.data.subscribers}</b></div>
                                <div> Lists <b>{props.data.author_lists}</b></div>
                            </div>
                        </div>
                    </div>
                    <div className={style.bgImage}>
                        <ModalBackground savePhoto={props.saveBg} username={props.data.username}/>
                    </div>
                </div>
                <div className={style.nav + " row "}>
                    <div className="col-0 col-lg-2 ">

                    </div>
                    <div className="col-lg-8 col-12">

                        <ul className={style.tabs}>
                            <li>
                                <NavLink activeClassName={style.active} to={MY_PROFILE_INFO}>Profile</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName={style.active} to={MY_BLOG_ROUTER}>Blog</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName={style.active} to={MY_BOOKS_ROUTER}>Books</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName={style.active} to={ADD_BOOKS_ROUTER}>Add book</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName={style.active} to={MY_LIBRARY_ROUTER}>My library</NavLink>
                            </li>
                            {props.data.is_moderator && (props.data.username === localStorage.getItem('username')) &&
                            <li><NavLink activeClassName={style.active} to={MODERATION_ROUTER}>Moderation</NavLink></li>
                            }
                            <li>
                                <NavLink activeClassName={style.active} to={MY_PROFILE_EXIT_ROUTER}>Exit</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={" row "}>
                    <div className={" order-2 order-lg-1 col-lg-2 col-12 threeSlider p-2"}>
                            <div  className={style.content}>
                                <div className='text-center'>
                                    {props.data.online ?
                                        <span className='text-success'>Online</span> : 'Был в сети ' +
                                        (props.data.last_seen ? props.data.last_seen.slice(0, 10) : 'null')}
                                </div>
                                <hr/>
                                <div className='text-center'>
                                    Rating: {props.data.rating}
                                </div>
                                <hr/>
                                <div className='text-center'>
                                    {
                                        props.data.join_date ? 'Registration : ' + props.data.join_date.slice(0, 10) : ''
                                    }
                                </div>
                            </div>
                            <div  style={{position: 'sticky', top: 10}} className={style.content}>
                                <div>
                                    <h5 className='text-center mt-2'><i className="fas fa-star"/>Advertising</h5>
                                    <AdvertisingContainer/>
                                </div>
                            </div>
                    </div>
                    <div className={" order-1 order-lg-2 col-lg-8 col-12 p-2 "}>

                        <div className={style.content}>
                            <Switch>
                                <Route path={MY_PROFILE_INFO} component={ProfileInfoComponent}/>
                                <Route path={MY_BLOG_ROUTER} component={BlogContainer}/>
                                <Route path={MY_BOOKS_ROUTER} component={BookListContainer}/>
                                <Route path={ADD_BOOKS_ROUTER} component={AddBookContainer}/>
                                <Route path={MY_LIBRARY_ROUTER} component={MyLibraryContainer}/>
                                <Route path={MODERATION_ROUTER} component={ModerationContainer}/>
                                <Route path={MY_PROFILE_EXIT_ROUTER}
                                       component={Exit}/>
                            </Switch>
                        </div>
                        <div className={style.content}>
                            <ProfileComments
                                deleteThisComment={props.deleteComment}
                                comments={props.comments}
                                username={props.data.username}
                                addComment={props.addComment}
                            />
                        </div>
                    </div>
                    <div className={" order-3 order-lg-3 col-lg-2 col-12 p-2"}>
                        <div style={{position: 'sticky', top: 10}} className={style.content}>
                            <h6 className='text-center'><i className="fas fa-user"/> Author of the day </h6>
                            <AuthorContainer/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;