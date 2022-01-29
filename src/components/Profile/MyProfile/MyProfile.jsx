import React, {useEffect, useState} from 'react';
import style from './MyProfile.module.css'

const MyProfile = ({user, updateProfile}) => {
    const [editBio, setEditBio] = useState(false);
    const [bio, setBio] = useState(user.bio)
    const [editFullname, setEditFullname] = useState(false);
    const [fullname, setFullname] = useState(user.fullname)


    const save = (type) => {
        const formData = new FormData();
        if (type === 'bio') {
            formData.append('bio', bio)
        } else if (type === 'fullname') {
            formData.append('fullname', fullname)
        }
        updateProfile(formData, localStorage.getItem('username'))
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-6">
                    <div className={style.block}>
                        <h4>Your personal link:</h4>
                        <div className={style.infoText} style={{wordWrap: 'break-word'}}>{window.location.origin + '/user/' + user.username}</div>

                    </div>
                    <div className={style.block}>
                        <h4>Name:</h4>
                        {
                            editFullname ?
                        <input className='form-control'
                               type='text'
                               autoFocus={true}
                               defaultValue={user.fullname}
                               onChange={(e) => setFullname(e.target.value)}
                               onBlur={() => {save('fullname'); setEditFullname(false) }}
                        /> :
                        <div onClick={() => setEditFullname(true)} style={{wordWrap: 'break-word'}} className={style.infoText}><p>{user.fullname ? user.fullname : '-'}</p></div>
                        }
                    </div>

                    <div className={style.block}>
                        <h4>Email:</h4>
                        <div style={{wordWrap: 'break-word'}} className={style.infoText}>{user.email ? user.email : '-'}</div>

                    </div>
                </div>
                <div className="col-lg-6">
                    <div className={style.block}>
                        <h4>About myself </h4>
                        {
                            editBio ? <textarea className='form-control'
                                                defaultValue={user.bio}
                                                autoFocus={true}
                                                onChange={(e) => setBio(e.target.value)}
                                                onBlur={() => {save('bio'); setEditBio(false) }}
                                                style={{height: 220}}
                                />
                                :
                                <div onClick={() => setEditBio(true)}
                                     className={style.bio}>{user.bio ? user.bio : 'You haven\'t told anything about yourself... '}</div>

                        }


                    </div>
                </div>
            </div>


        </div>
    );
};

export default MyProfile;