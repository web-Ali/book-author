import React from 'react';
import style from "../Main/Slider.module.css";
import {NavLink} from "react-router-dom";
import {BOOK_ROUTE, USER_ROUTE} from "../../routing/consts";
import {httpOnHttps, nameLengthSlice} from "../../utils/customFunc";
import photo from "../../assets/images/unnamed.png";

const ThreeAdversiting = ({data}) => {
    return (
        <>
            {data?.length ? data.map((value) => {
                return (
                    <div className={style.slide + ' ' + style.three} key={value.id}>

                        <div className={'animate__animated ' + 'animate__pulse'}><NavLink
                            to={BOOK_ROUTE + '/' + value.id}><img className=''
                                                                  src={value.cover ? httpOnHttps(value.cover) : photo}
                                                                  alt=""/></NavLink></div>
                        <div>
                            <h5>
                                <NavLink to={BOOK_ROUTE + '/' + value.id}>
                                    {nameLengthSlice(value.name,80)}
                                </NavLink>
                            </h5>
                        </div>
                        <div><p><NavLink
                            to={USER_ROUTE + '/' + value.user.username}>{value.user.fullname.length ? value.user.fullname : value.user.username}</NavLink>
                        </p></div>
                    </div>
                )
            }) : ''
            }
        </>
    );
};

export default ThreeAdversiting;