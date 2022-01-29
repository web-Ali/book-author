import React from 'react';
import photoProfile from './../../assets/images/profile.jpg'
import style from './Blog.module.css'
import {Link} from "react-router-dom";
import AdvertisingContainer from "../../containers/Advertising/AdvertisingContainer";
import AuthorContainer from "../../containers/Main/AuthorContainer";
import BookComments from "../Book/BookComments";
import {SEARCH_BLOG_ROUTER, USER_ROUTE} from "../../routing/consts";

const Blog = (props) => {

    return (
        <div className='row'>
            <div className="col-xl-10 col-12">
                <div className={style.content + ' row'}>
                    <div className=' col-lg-1 col-2 p-0'>
                        <div className={style.img}>
                            <img src={props.data.user.image ? props.data.user.image : photoProfile} alt=""/>
                        </div>
                    </div>
                    <div className='col-lg-11  col-10'>
                        <div className='d-flex justify-content-between'>
                            <div className={style.title}>{props.data.title}</div>
                            <div  className='text-secondary fst-italic'>2022.22.22</div>
                        </div>
                        <div>Author:<Link to={USER_ROUTE+'/'+ props.data.user.username} >  {props.data.user.fullname ? props.data.user.fullname : props.data.user.username}</Link> </div>
                        <div className='mt-3'>
                            <i className="fa fa-eye" aria-hidden="true"/> {props.data.views} views

                        </div>
                    </div>
                </div>
                <div className={style.content + ' row'} >
                    <div className={style.theme}><Link to={SEARCH_BLOG_ROUTER+'/'+props.data.theme.id}>{props.data.theme.name}</Link></div>

                    <div className='ck-content'>
                        <div
                            dangerouslySetInnerHTML={{__html: props.data.markdown }}/>
                    </div>
                </div>
                <div className={style.content + ' row'}>
                    <BookComments deleteThisComment={props.deleteThisComment} comments={props.comments} bookId={props.data.id} addComment={props.addComment}/>
                </div>
            </div>
            <div className="col-xl-2 col-12">
                    <div  className={style.content}>
                        <div >
                            <h5 className='text-center mt-2'><i className="fas fa-star"/>Advertising</h5>
                            <AdvertisingContainer type={'blog'}/>
                        </div>
                    </div>
                    <div   className={style.content}>
                        <h6 className='text-center'><i className="fas fa-user"/> Author of the day </h6>
                        <AuthorContainer/>
                    </div>
            </div>

        </div>
    );
};

export default Blog;