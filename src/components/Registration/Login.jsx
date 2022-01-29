import React, {useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {REGISTRATION_ROUTE} from "../../routing/consts";
import {NavLink} from "react-router-dom";

function Login({postLogin,er,isFetching}) {


    // const history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] = useState('')

    const click = () => {
        const formData = new FormData();
            formData.append('username', username);
        formData.append('password', password);

        postLogin(formData);
    }
    // if (localStorage.getItem('id')) {
    //     history.push(MAIN_ROUTE)
    // }
    //
    // const click = async () => {
    //     try {
    //         setError('');
    //         await login(username, password);
    //         history.go(0)
    //     } catch (e) {
    //         setError('Произошла ошибка входа, неправильный логин или пароль')
    //
    //     }
    //
    // }

    // if (this.props.location.state?.data) {
    //     const clickProps = async () => {
    //         try {
    //             let l = this.props.location.state.data.Login;
    //             let p = this.props.location.state.data.Password;
    //             await login(l, p);
    //             history.go(0)
    //         } catch (e) {
    //             setError('Произошла ошибка входа, неправильный логин или пароль')
    //         }
    //     };
    //     clickProps();
    //     delete this.props.location.state.data;
    // }

    return (
        <div>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 54}}
            >
                <Card style={{width: 600}} className="p-5">
                    <h2 className="m-auto">Authorization</h2>
                    <p className={'mt-2'}>{er}</p>
                    <p>{isFetching?<span>Sending data, please wait</span>:null}</p>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="login..."
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="password..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                        <Row className="d-flex justify-content-between m-0 mt-3 text-end">


                            <Button
                                variant={"outline-success"}
                                onClick={click}
                            >
                                Sign-In
                            </Button>


                            <div className='mt-3 text-center'>
                                Don't have an account?  <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
                            </div>


                        </Row>

                    </Form>
                </Card>
            </Container>
        </div>
    );
}


export default Login;