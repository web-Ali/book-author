import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import style from './Header.module.css'

const Notifications = (props) => {
    // console.log(props.notifications)
    const handleClose = () => {
        console.log('close')
        props.offModal(false)
    };
    const SaveAndClose = () => {
        props.requestNotifications('view')
        props.offModal(false)
    };

    return (
        <div>
            <Modal
                show={true}
                onHide={handleClose}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className='d-flex justify-content-between'>
                            <div><i className="fas fa-bell"/> Notifications</div>
                        </div>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='text-end mb-3'><Button onClick={SaveAndClose} variant="primary">Checked</Button>
                    </div>
                    {props.notifications.map((notif) => {
                        return <div key={notif.id}>
                            <div className='position-relative d-inline-block'>
                                {notif.created_at.slice(0, 10)} {notif.created_at.slice(11, 19)}
                                {notif.checked ? null : <i className={style.notiCircle + ' fas fa-circle'}/>
                                }
                            </div>
                            <div dangerouslySetInnerHTML={{__html: notif.message}}/>
                            <hr/>
                        </div>
                    })}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">Close</Button>
                    <Button onClick={SaveAndClose} variant="primary">Checked</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Notifications;