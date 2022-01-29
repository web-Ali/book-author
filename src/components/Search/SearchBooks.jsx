import React, {useEffect, useState} from 'react';
import style from './Search.module.css';
import Select from "react-select";
import {NavLink, useHistory} from "react-router-dom";
import photo from "../../assets/images/unnamed.png";
import Loader from "../Loader/Loader";
import {BOOK_ROUTE, SEARCH_BOOK_ROUTER, USER_ROUTE} from "../../routing/consts";
import AdvertisingContainer from "../../containers/Advertising/AdvertisingContainer";
import Hyphenated from "react-hyphen";
import {nameLengthSlice} from "../../utils/customFunc";

const SearchBooks = (props) => {
    const [genre, setGenre] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [tags, setTags] = useState([]);
    const [paid, setPaid] = useState(null);
    const [genreList, setGenreList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [tagsList, setTagsList] = useState([]);

    const history = useHistory();
    useEffect(() => {
        window.scrollTo(0, 100)
    }, [props.search.results])

    useEffect(() => {
        let tempForm = [{value: 0, label: '---'}];
        let tempGenre = [{value: 0, label: '---'}];
        let tempTags = [];
        if (Array.isArray(props.bookInfo.bookForms) && props.bookInfo.bookForms.length) {
            props.bookInfo.bookForms.map((a) => {
                tempForm.push({value: a.pk, label: a.form})
            })
            setTypeList(tempForm)
        }
        if (Array.isArray(props.bookInfo.tags) && props.bookInfo.tags.length) {
            props.bookInfo.tags.map((a) => {
                tempTags.push({value: a.pk, label: a.tag})
            })
            setTagsList(tempTags)
        }
        if (Array.isArray(props.bookInfo.genres) && props.bookInfo.genres.length) {
            props.bookInfo.genres.map((a) => {
                tempGenre.push({value: a.pk, label: a.genre})
            })
            setGenreList(tempGenre)
        }
    }, [props.bookInfo])


    const reqSearch = () => {
        let tagsString = 0;
        if (tags.length > 0) {
            tags.map(a => {
                tagsString = tagsString + a.value + '-';
            })
            tagsString = tagsString.slice(0, -1);

        }
        history.push(SEARCH_BOOK_ROUTER + '/'
            + (type.value ? type.value : 0) + '/'
            + (genre.value ? genre.value : 0) + '/'
            + (name ? name : 0) + '/'
            + tagsString + '/'
            + paid
        )

    }

    return (
        <div>
            <div className={style.wrapper + " container  mt-3 "}>
                    <div className='row'>
                        <div className="col-lg-10 col-12">
                            <div className={style.content + ' ' + style.filter}>
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-sm-6 col-12">
                                        <Select
                                            onChange={(selectedOption) => {
                                                setGenre(selectedOption);
                                            }}
                                            value={genre}
                                            className="basic-multi-select mb-3"
                                            classNamePrefix="select"
                                            options={genreList}
                                            placeholder='select genre'
                                        />
                                    </div>
                                    <div className="col-lg-2 col-sm-6 col-12">
                                        <Select
                                            onChange={(selectedOption) => {
                                                setType(selectedOption);
                                            }}
                                            value={type}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            options={typeList}
                                            placeholder='select form'
                                        />
                                    </div>

                                    <div className="col-lg-6 col-sm-6 col-12 mt-sm-0 mt-2">
                                        <Select
                                            onChange={(selectedOption) => {
                                                setTags(selectedOption);
                                            }}
                                            value={tags}
                                            isMulti
                                            className="basic-multi-select mb-3 w-100"
                                            classNamePrefix="select"
                                            options={tagsList}
                                            placeholder='select tags'
                                        />
                                    </div>
                                    <div className="col-lg-2 col-sm-6 col-12">

                                        <select defaultValue={null} onChange={(e) => setPaid(e.target.value)}
                                                className='form-select'>
                                            <option value={null}>Paid/Free</option>
                                            <option value={1}>Paid</option>
                                            <option value={2}>Free</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="row mb-5">
                                    <div className="col-md-10">
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                               placeholder='name' className='form-control'/>
                                    </div>
                                    <div className="col-md-2 mt-md-0 mt-2">
                                        <button onClick={reqSearch} className='btn btn-success w-100'>Search</button>
                                    </div>
                                </div>

                                <div className="row mb-5">
                                    <h3 className='mb-3'>What to read?</h3>
                                    {
                                        props.isFetching ? <Loader fix={false}/> :
                                            Array.isArray(props.search.results) && props.search.results.map((a, index) => {
                                                return (
                                                    <div key={index} className={style.item + " col-lg-2 col-sm-4 col-6"}>
                                                        <div className={style.image}>
                                                            <NavLink to={BOOK_ROUTE + '/' + a.id}><img
                                                                src={a.cover ? a.cover : photo}
                                                                alt=""/></NavLink>
                                                        </div>
                                                        <div className={style.title}>
                                                            <Hyphenated>
                                                            <NavLink
                                                            to={BOOK_ROUTE + '/' + a.id}>{nameLengthSlice(a.name,50)}</NavLink>
                                                            </Hyphenated>

                                                        </div>
                                                        <div className='fw-bold'>{a?.form.form} </div>
                                                        <div className={style.author}>
                                                            <NavLink
                                                            to={USER_ROUTE + '/' + a.user.username}>
                                                            {a.user.fullname ? a.user.fullname: a.user.username}
                                                        </NavLink>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                    }
                                    {
                                        !props.isFetching &&
                                        <div className='d-flex justify-content-between'>
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
                        </div>
                        <div className="col-lg-2 col-12">
                            <div className={style.content}>
                                <div className='pt-2'>
                                    <h6 className='text-center'><i className="fas fa-star"></i>Advertising</h6>
                                    <AdvertisingContainer/>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default SearchBooks;