import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import {Button} from "react-bootstrap";

const ModalAccept = ({button, text, desc, call,}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const funCall = async () => {
        await call();
        handleClose();
    }

    return (
        <>

           <span onClick={handleShow}> {button} </span>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{text}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{desc}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={funCall}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalAccept;
