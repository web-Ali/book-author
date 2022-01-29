import React, {useState} from 'react';
import style from '../Profile/Profile.module.css';
import bg from "../../assets/images/default-bg.jpg";
import photo from "../../assets/images/profile.jpg";
import UserBooks from "./UserBooks/UserBooks";
import UserInfo from "./UserInfo/UserInfo";
import ProfileComments from "../Profile/ProileComments";
import AdvertisingContainer from "../../containers/Advertising/AdvertisingContainer";
import AuthorContainer from "../../containers/Main/AuthorContainer";
import UserBlog from "./UserBlog/UserBlog";
import {Link} from "react-router-dom";

const User = (props) => {
    const [tabs, setTabs] = useState('profile');
    return (

        <>

            <div className="container">
                <div style={{backgroundImage: `url(${props.data?.cover ? props.data.cover : bg})`}}
                     className={style.coverBg}>
                    <div className="row pt-5 pb-5 align-items-lg-end align-items-start position-relative">
                        <div className="col-sm-2 col-3">
                            <div className={style.profImg}>
                                <img src={props.data.image ? props.data.image : photo} alt=""/>
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
                    <div style={{display: 'block'}} className={style.bgImage}>

                        <button onClick={() => props.subscribe(props.data.username)} className='btn btn-light '>
                            {props.data.is_sub ? <span>&#10003; You are subscribed</span> :
                                <span>&#43; Subscribe</span>}
                        </button>

                    </div>
                </div>
                <div className={style.nav + " row"}>
                    <div className="col-0 col-lg-2">

                    </div>
                    <div className="col-lg-8 col-12">
                        <ul className={style.tabs}>
                            <li>
                                <a className={tabs === 'profile' ? style.active : null}
                                   onClick={() => setTabs('profile')}>Profile</a>
                            </li>
                            <li>
                                <a className={tabs === 'books' ? style.active : null}
                                   onClick={() => setTabs('books')}>Books</a>
                            </li>
                            <li>
                                <a className={tabs === 'blog' ? style.active : null}
                                   onClick={() => setTabs('blog')}>Blog</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={" row m-0"}>
                    <div className={" order-2 order-lg-1 col-lg-2 col-12 threeSlider"}>
                        <div style={{position: 'sticky', top: 10}}>

                            <div className={style.content}>
                                <div>
                                    <h5 className='text-center mt-2'><i className="fas fa-star"/>Advertising</h5>
                                    <AdvertisingContainer/>
                                </div>
                            </div>
                            <div className={style.content}>
                                <div className='text-center'>
                                    {props.data.online ?
                                        <span className='text-success'>Online</span> :


                                        (props.data.last_seen ?
                                            'Last online day \n ' + props.data.last_seen.slice(0, 10)
                                            : null)}
                                </div>
                                <hr/>
                                <div className='text-center'>
                                    Rating: {props.data.rating}
                                </div>
                                <hr/>
                                <div className='text-center'>
                                    {
                                        props.data.join_date ? 'Registration: ' + props.data.join_date.slice(0, 10) : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={" order-1 order-lg-2 col-lg-8 col-12 "}>

                        <div className={style.content}>
                            <div>
                                {
                                    tabs === 'books' ? <UserBooks books={props.books}/>
                                        :
                                        tabs === 'profile' ? <UserInfo user={props.data}/>
                                            :
                                            tabs === 'blog' ? <UserBlog blogs={props.blogs}/>
                                                : null
                                }

                            </div>
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
                    <div className={" order-3 order-lg-3 col-lg-2 col-12 "}>
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

export default User;