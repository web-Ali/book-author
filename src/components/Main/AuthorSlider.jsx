import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import photo from "../../assets/images/profile.jpg";
import style from "./Slider.module.css";
import "./slider.css";
import {Link} from "react-router-dom";
import {USER_ROUTE} from "../../routing/consts";
import {httpOnHttps} from "../../utils/customFunc";

const AuthorSlider = ({data}) => {
    return (
        <>



                {data?.length ? data.map((value) => {
                    return (
                        <div className={style.slide + ' ' + style.author} key={value.id}>

                            <div className={'animate__animated ' + 'animate__pulse'}><Link
                                to={USER_ROUTE + '/' + value.username}><img className=''
                                                                            src={value.image ? httpOnHttps(value.image) : photo}
                                                                            alt=""/></Link></div>
                            <div><p><Link
                                to={USER_ROUTE + '/' + value.username}>{value.fullname.length ? value.fullname : value.username}</Link>
                            </p></div>

                        </div>
                    )
                }) : ''
                }



        </>
    )
}
export default AuthorSlider;