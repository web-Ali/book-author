import React, {useEffect, useState} from 'react';
import {LOGIN_ROUTE,} from "../../routing/consts";
import {NavLink,} from "react-router-dom";
import {Button, Card, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Registration = (props) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [pasError, setPasError] = useState('')


    const [register, setRegister] = useState(false)

    useEffect(() => {
        if (props.is_registered) {
            setRegister(true);
        }
    }, [props.is_registered])

    const click = (event) => {
        event.preventDefault();

        if (username === '' || email === '' || fullname === '' || rePassword === '' || password === '') {
            setPasError('Fill in the blank fields!')
            return
        }
        if (password !== rePassword || password === '') {
            setPasError('Password mismatch!')
            return
        }
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('fullname', fullname);
        formData.append('password', password);
        try {
            props.registration(formData)
        } catch (e) {
            console.log(e)
        }

        // history.push(PROFILE_ROUTE)
    };
    return (
        <div>
            <Container
                className="d-flex justify-content-center align-items-center mt-1"
                style={{height: window.innerHeight - 54}}
            >
                {register ? <div>
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading text-center">Well done!</h4>
                            <p>You have registered, now you can enter the service! </p>
                            <hr/>
                            <p className="mb-0 text-center"><NavLink to={LOGIN_ROUTE}><span
                                className='text-decoration-underline'>Go to!</span></NavLink></p>
                        </div>
                    </div>
                    :
                    <Card style={{width: 600}} className="p-5">
                        <h2 className="m-auto">Registration</h2>
                        <p className={'mt-2 text-danger'}>{pasError}</p>
                        <p className={'mt-2 text-danger'}>{props.error}</p>
                        <Form className="d-flex flex-column">
                            <Form.Control
                                className="mt-3"
                                placeholder="Please enter your full name..."
                                value={fullname}
                                onChange={e => setFullname(e.target.value)}
                                type="text"
                            />

                            <Form.Control
                                className="mt-3"
                                placeholder="Enter your email..."
                                value={email}
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Enter your login..."
                                value={username}
                                type="text"
                                onChange={e => setUsername(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Enter your password..."
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Repeat your password..."
                                value={rePassword}
                                onChange={e => setRePassword(e.target.value)}
                                type="password"
                            />
                            <Row className="d-flex justify-content-between m-0 mt-3 text-end">
                                <Button
                                    variant={"outline-success"}
                                    onClick={click}
                                >
                                    Register now
                                </Button>
                                <div className='mt-3 text-center'>
                                    Have an account? <NavLink to={LOGIN_ROUTE}>Sign in!</NavLink>
                                </div>
                            </Row>
                        </Form>
                    </Card>
                }
            </Container>
        </div>
    );
};

export default Registration;