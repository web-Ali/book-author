import React, {useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import photo from "../../assets/images/unnamed.png";
import style from "./Slider.module.css";
import "./slider.css";
import {NavLink} from "react-router-dom";
import {BOOK_ROUTE, USER_ROUTE} from "../../routing/consts";
import Loader from "../Loader/Loader";
import {httpOnHttps, nameLengthSlice} from "../../utils/customFunc";

const MostReadedSlider = ({data, isFetching }) => {
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "linear",
        className: 'mostReaded',
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            }
        ]

    };
    return (
        <>

            {isFetching ? <div style={{height:'340px', paddingTop: '150px'}}> <Loader fix={false} /></div> :
                <Slider {...settings} >
                    {data?.length && data.map((value) => {
                        return (
                            <div className={style.slide} key={value.id}>

                                <div  className={'animate__animated '+'animate__pulse' }><NavLink to={BOOK_ROUTE + '/' + value.id}><img className='' src={value.cover ? httpOnHttps(value.cover) :photo} alt=""/></NavLink></div>
                                <div><h5><NavLink to={BOOK_ROUTE + '/' + value.id}>{nameLengthSlice(value.name,60)}</NavLink></h5></div>
                                <div><p ><NavLink to={USER_ROUTE + '/' + value.user.username}>{value.user.fullname.length ? value.user.fullname : value.user.username}</NavLink></p></div>
                            </div>
                        )
                    })
                    }
                </Slider>

            }


        </>
    )
}
export default MostReadedSlider;