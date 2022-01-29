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
import Hyphenated from 'react-hyphen';
import {httpOnHttps, nameLengthSlice} from "../../utils/customFunc";

const MainSlider = ({data, isFetching}) => {

    let settings = {
        dots: false,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 8000,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    dots: true,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <>

            {isFetching ? <div style={{height:'340px', paddingTop: '150px'}}> <Loader fix={false} /></div> :
                <Slider {...settings}>
                    {data?.length && data.map((value) => {
                        return (
                            <div className={style.slide} key={value.id}>

                                <div  className={'animate__animated '+'animate__pulse' }><NavLink to={BOOK_ROUTE + '/' + value.id}><img className='' src={value.cover ? httpOnHttps(value.cover) : photo} alt=""/></NavLink></div>
                                <Hyphenated><div><h5><NavLink to={BOOK_ROUTE + '/' + value.id}>{nameLengthSlice(value.name,60)}</NavLink></h5></div></Hyphenated>
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
export default MainSlider;