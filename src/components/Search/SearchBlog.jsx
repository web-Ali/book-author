import React, {useEffect, useState} from 'react';
import Select from "react-select";
import style from './Search.module.css'
import {BLOG_ROUTE,  SEARCH_BLOG_ROUTER, USER_ROUTE} from "../../routing/consts";
import {Link, NavLink, useHistory} from "react-router-dom";
import profilePhoto from './../../assets/images/profile.jpg'
import AdvertisingContainer from "../../containers/Advertising/AdvertisingContainer";

const SearchBlog = (props) => {
    const [themes, setThemes] = useState('')
    const [text, setText] = useState('')

    const history = useHistory();

    useEffect(()=>{
        window.scrollTo(0,100)
    },[props.search.results])

    let themesOption = props.themes.map((item)=>{
        return {value: item.id, label: item.name}
    })
    const reqSearch = () => {

        history.push(SEARCH_BLOG_ROUTER + '/'
            + (themes.value ? themes.value : 0) + '/'
            + (text ? text : 0)
        )

    }
    return (
        <div className='container' >
            <div className="row">
                <div className="col-xl-10 col-12">

                    <div className={style.content +' row'}>
                        <h4 className='mb-2'>Community</h4>
                        <hr/>
                        <div className="col-md-3 col-12">
                            <Select
                                onChange={(selectedOption) => {
                                    setThemes(selectedOption);
                                }}
                                value={themes}
                                className="basic-multi-select mb-3"
                                classNamePrefix="select"
                                options={themesOption}
                                placeholder='select theme'
                            />
                        </div>
                        <div className="col-md-7 col-12">
                            <input defaultValue={text}
                                   type="text"
                                   onChange={(e)=> setText(e.target.value)}
                                   className='form-control mb-3'
                                   placeholder='query string'
                            />
                        </div>
                        <div className="col-md-2 col-12">
                            <button onClick={reqSearch} className='w-100 btn btn-primary'><i className="fas fa-search" /></button>
                        </div>
                        <div>
                            {(props.searchText && props.searchText != 0 ) ?
                                <h4  className='fst-italic mt-3'>Query string: {props.searchText}</h4>
                                : null}
                        </div>
                    </div>
                    <div className={' row'}>

                        {props.search.results.length > 0 ?  props.search.results.map((blog)=>{
                            let markdown = blog.markdown.replace(/<img[^>]*>/g, "")
                            return <div key={blog.id} className={style.blogItem + ' ' + style.content}>
                                <div className='row mt-2 ms-2'>
                                    <div className={style.blogImg + ' col-lg-1 col-2 p-0'}>
                                        <Link to={USER_ROUTE+'/'+blog.user.username}>
                                            <img src={blog.user.image ? blog.user.image : profilePhoto} alt=""/>
                                        </Link>
                                    </div>
                                    <div className='col-lg-11 col-10'>
                                        <div className='d-flex justify-content-between'>
                                            <div className={style.title}>
                                                <NavLink
                                                    to={BLOG_ROUTE + '/' + blog.id}><h3>{blog.title}</h3></NavLink>
                                            </div>
                                            <div className='text-secondary fst-italic'>
                                                {blog.created_at.slice(0,10)}
                                            </div>
                                        </div>

                                        <div className='mt-2'>Author: &nbsp;
                                            <Link to={USER_ROUTE+'/'+blog.user.username}>
                                                {blog.user.fullname ? blog.user.fullname : blog.user.username}
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                                <hr/>
                                <h5 className='fw-bold ps-3'>{blog.theme.name}</h5>
                                <div className='ck-content p-3'>
                                    <div
                                        dangerouslySetInnerHTML={{__html: markdown.length > 300 ?
                                                markdown.slice(0, 400) + ' ......' : markdown}}
                                    />
                                </div>
                                <div className='d-flex justify-content-end mt-3'>
                                    <Link to={BLOG_ROUTE +'/'+blog.id}><button className='btn btn-primary'>Read more...</button></Link>
                                </div>


                            </div>
                        })
                            :
                            <div className={style.content+ ' text-center fw-bold'}>No result</div>

                        }
                        {
                            !props.isFetching && (props.search.previous || props.search.next) &&
                            <div className='content d-flex justify-content-between'>
                                {
                                    props.search.previous ?
                                        <button
                                            onClick={() => {
                                                props.searchNext(props.search.previous.slice(props.search.previous.indexOf("books/?") + 7))
                                            }}
                                            className={style.btn + ' btn'}>
                                            ← Previous
                                        </button>
                                        :
                                        <div></div>
                                }
                                {
                                    props.search.next ?
                                        <button
                                            onClick={() => {
                                                props.searchNext(props.search.next.slice(props.search.next.indexOf("books/?") + 7))
                                            }}
                                            className={style.btn + ' btn'}>
                                            Next →
                                        </button>
                                        :
                                        <div></div>
                                }

                            </div>
                        }
                    </div>
                </div>
                <div className="col-xl-2 col-12">
                    <div className={style.content}>
                        <div className='pt-2'>
                            <h6 className='text-center'><i className="fas fa-star"></i>Advertising</h6>
                            <AdvertisingContainer/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SearchBlog;