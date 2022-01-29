import React from 'react';
import style from './Footer.module.css'

const Footer = () => {
    return (
        <div className={style.footerWrapper}>
            <div className={style.footerTopBorder} />
            <div className="container pt-4">
                <div className="row">
                    <div className="col-12 col-sm-6 col-lg-3 text-center text-sm-start">
                        <div>
                            <h5 className='fw-bold'>FOR WRITERS </h5>
                            <ul>
                                <li>Why you need to become an author</li>
                                <li>Who needs to become an author</li>
                                <li>General information</li>
                                <li>Copyright agreement</li>
                                <li>Advertising contract on the platform</li>
                                <li>Targeted advertising</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 text-center text-sm-start">
                        <div>
                            <h5 className='fw-bold'>FOR USERS </h5>
                            <ul>
                                <li>User agreement</li>
                                <li>How to use the platform</li>
                                <li>How to support your favorite writer</li>
                                <li>Description of genres of books</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 text-center text-sm-start">
                        <div>
                            <h5 className="fw-bold">
                                CONTACT
                            </h5>
                            <ul>
                                <li>email@mail.ru</li>
                                <li>+79999999999</li>
                                <li>Moderators</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 text-center text-sm-start">
                        <div>
                            <h5 className="fw-bold">
                                ABOUT THE PROJECT
                            </h5>
                            <ul>
                                <li>Why was the project created</li>
                                <li>Further development of the project</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;