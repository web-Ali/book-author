import React, {useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE} from "../../routing/consts";
import Modal from "react-bootstrap/Modal";
import style from "./Header.module.css";
import Button from "react-bootstrap/Button";

export default function ModalAuth() {
    const [showModal, setShowModal] = useState(false);

    const history = useHistory();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const onSubmit = (data, e) => {
        history.push(LOGIN_ROUTE, {data})
        reset();
        handleClose();
    };

    return (
        <>
            <span style={{cursor: 'pointer'}} onClick={handleShow}>Sign-In</span>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign-In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <br/>
                        <label>Login</label>
                        <input type="text" className={'form-control mt-1'} placeholder="Login" {...register("Login", {
                            required: {
                                value: true,
                                message: "Fiels is required"
                            }
                        })} />
                        {errors?.Login?.message ?
                            <p className={'text-danger ' + style.error}>{errors?.Login?.message}</p> : null}
                        <label className='mt-4'>Password</label>
                        <input type="password" className={'form-control   mt-1  '}
                               placeholder="Password" {...register("Password", {
                            required: {
                                value: true,
                                message: "Fiels is required"
                            }
                        })} />
                        {errors?.Password?.message ?
                            <p className={'text-danger ' + style.error}>{errors?.Password?.message}</p> : null}

                        {/*<label ><input type="checkbox" className='mb-3 mt-4'*/}
                        {/*       placeholder="Запомнить меня" {...register("Remember", {})} /> Запомнить меня </label>*/}
                        <Button className='mt-5' type='submit' variant="primary"  style={{width: "100%"}}>
                            Sign-In
                        </Button>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{justifyContent: 'center'}}>

                    <NavLink to={PROFILE_ROUTE} style={{width: "100%"}}>

                    </NavLink>
                    <p className={style.registr + ' mt-3'}>Don't have an account? <span onClick={handleClose}><NavLink
                        to={REGISTRATION_ROUTE}>Register!</NavLink></span></p>

                </Modal.Footer>
            </Modal>
        </>
    );
}