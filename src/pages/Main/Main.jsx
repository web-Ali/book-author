import React from 'react';
import style from "./Main.module.css";
import SliderContainer from "../../containers/Main/SliderContainer";
import photo from '../../assets/images/unnamed.png'
import photoProf from '../../assets/images/profile.jpg'
import {Link} from "react-router-dom";
import MostReadedContainer from "../../containers/Main/MostReadedContainer";
import AuthorContainer from "../../containers/Main/AuthorContainer";
import ContinueRead from "../../containers/Main/ContinueRead";

const Main = () => {

    return (
        <div>
            <div className="container ">
                <div>
                    {!localStorage.getItem('username') &&
                    <div className=" row content">

                        <div className="col-lg-9 pb-3" style={{
                            borderRight: '1px solid lightgray',
                            borderBottom: '1px solid lightgray'
                        }}>
                            <div className="row p-0 m-0">
                                <div className="col-sm-6 col-12">
                                    <h3>Make 100’s of thousands dollars annually being an online writer. Keep your author’s rights.  </h3>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <h3>Work hard from anywhere you want. Work hard anytime you want. Earn as much as you want. </h3>
                                </div>
                            </div>
                            <div className='text-center mt-4'>
                                <Link to={'/registration'}>
                                    <button className='btn btn-primary w-100'>Register now!</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 text-center" style={{
                            borderBottom: '1px solid lightgray'
                        }}>
                            <div>
                                <Link to={'#'}>
                                    <button className='btn btn-primary w-50 mt-3' style={{borderRadius: 50}}>Newbie
                                        readers!
                                    </button>
                                </Link>
                            </div>
                            <div>
                                <Link to={'#'}>
                                    <button className='btn btn-primary w-50 mt-4' style={{borderRadius: 50}}>Newbie
                                        authors!
                                    </button>
                                </Link>
                            </div>
                        </div>


                    </div>
                    }

                    <div className={" row"}>
                        <div className={' col-lg-9 col-xxl-10 ps-0 col-12 pe-0'}>
                            <div className={style.main + ' '}>
                                <div className={style.books + ' flex-nowrap pb-5 pt-4 pe-5 text-center text-lg-start'}>
                                    <h2> Advertising </h2>
                                    <h6 className='text-secondary'>Your ad can be here
                                    </h6>
                                    {/*<SliderContainer type={'popular'} />*/}
                                </div>
                                <div className={style.books + ' flex-nowrap pb-5 pt-4 pe-5 text-center text-lg-start'}>
                                    <h2> Popular </h2>

                                    <SliderContainer type={'popular'}/>
                                </div>
                                <div className={style.books + ' flex-nowrap pb-5 pt-4 pe-5 text-center text-lg-start'}>
                                    <h2><i className="fas fa-fire-alt"/> Hot! </h2>
                                    <SliderContainer type={'hot'}/>
                                </div>
                                <div className={style.books + ' flex-nowrap pb-5 pt-4 pe-5 text-center text-lg-start'}>
                                    <h2><i className="fas fa-star"/> Best sellers </h2>
                                    <SliderContainer type={'bestsellers'}/>
                                </div>
                            </div>
                        </div>
                        <div className={' col-lg-3 col-xxl-2 col-12 pe-sm-2 pe-0 ps-sm-2 ps-0'}>
                            <div className={style.books + ' mostReaded text-center mt-4 ps-0'}>
                                <h2 className='mt-4'><i className="fas fa-star"/> Top 15 </h2>
                                <MostReadedContainer/>
                            </div>
                            {
                                localStorage.getItem('username') ? <ContinueRead/>
                                    : null
                            }

                            <div className={style.books + ' mainAuthor text-center mt-4 ps-0'}>
                                <h3 className={style.authorOfDay + ' p-2'}  ><i className="fas fa-user"/> Author of the day </h3>
                                <AuthorContainer/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Main;

