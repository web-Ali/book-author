import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

const ModalInfo = ({button, text, desc}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div onClick={handleShow}> {button} </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{text}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{desc}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        OK
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalInfo;