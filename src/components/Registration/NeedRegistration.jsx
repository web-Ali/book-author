import React, {useState} from 'react';
import {LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE} from "../../routing/consts";
import Modal from "../Header/Header";
import style from "../Header/Header.module.css";
import {NavLink} from "react-router-dom";

const NeedRegistration = (props) => {

    const [showModal, setShowModal] = useState(props.enabled);
    const handleClose = () => setShowModal(false);
    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter the site</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You are not logged in, <NavLink to={LOGIN_ROUTE}>click</NavLink> to enter
                </Modal.Body>
                <Modal.Footer style={{justifyContent: 'center'}}>

                    <p className={style.registr + ' mt-3'}>Нет аккаунта? <span onClick={handleClose}><NavLink
                        to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink></span></p>
                </Modal.Footer>
            </Modal>
        </>
    );

};

export default NeedRegistration;