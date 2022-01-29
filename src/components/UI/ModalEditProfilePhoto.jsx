import React, {useEffect, useRef, useState} from 'react';
import {Modal} from "react-bootstrap";
import style from "./ModalEditPhoto.module.css";

const ModalEditPhoto = ({savePhoto,username}) => {

    const [showModalEditPhoto, setShowModalEditPhoto] = useState(false);
    const [image, setImage] = useState();
    const [preview, setPreview] = useState('');
    const fileInputRef = useRef();

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null)
        }
    }, [image]);

    const handleClose = () => setShowModalEditPhoto(false);
    const handleShow = () => setShowModalEditPhoto(true);

    const onClickPhoto = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('image',image);

        savePhoto(formData,username)
            .then(
                handleClose()
            )
    }
    return (
        <div>
            <button onClick={handleShow} className='btn btn-secondary '>
                <i className="fas fa-image"/> Change
            </button>
            <div >
                <Modal show={showModalEditPhoto} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Photo for profile <br/> <span style={{fontSize: 14}}>select a photo with an aspect ratio of 1 : 1</span></Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <form className={style.ModalPhotoEdit +' ' + style.ModalProfilePhotoEdit} >
                            {preview ? (
                                <div className='mb-2'>
                                    <div className='mb-2'><img src={preview} alt={"preview"}/></div>
                                    <button
                                        className='btn btn-primary me-3'
                                        onClick={(event) => {
                                            event.preventDefault();
                                            fileInputRef.current.click();
                                        }}
                                    >
                                        choose another cover
                                    </button>
                                    <button
                                        className='btn-success btn'
                                        onClick={onClickPhoto}
                                    >
                                        save
                                    </button>
                                </div>

                            ) : (
                                <button
                                    style={{marginTop:100}}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        fileInputRef.current.click();
                                    }}
                                >
                                    Сhoose a cover
                                </button>
                            )}

                            <input type="file"
                                   style={{display: "none"}}
                                   ref={fileInputRef}
                                   accept="image/*"
                                   onChange={(event) => {
                                       const file = event.target.files[0];
                                       if (file && file.type.substr(0, 5) === "image") {
                                           setImage(file);
                                       } else {
                                           setImage(null);
                                       }
                                   }}
                            />

                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}


export default ModalEditPhoto;