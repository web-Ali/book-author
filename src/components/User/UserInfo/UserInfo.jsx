import React from 'react';
import style from "../../Profile/MyProfile/MyProfile.module.css";

const UserInfo = ({user}) => {

    return (
        <div>
            <div className="row">
                <div className="col-lg-6">
                    <div className={style.block}>
                        <h4>Personal link:</h4>
                        <div style={{wordWrap: 'break-word'}} className={style.infoText}>{window.location.origin + '/user/' + user.username}</div>

                    </div>
                    <div className={style.block}>
                        <h4>Name:</h4>
                        <div style={{wordWrap: 'break-word'}} className={style.infoText}>{user.fullname ? user.fullname : '-'}</div>
                    </div>

                    {/*<div className={style.block}>*/}
                    {/*    <h4>Email:</h4>*/}
                    {/*    <div style={{wordWrap: 'break-word'}} className={style.infoText}>{user.email ? user.email : '-'}</div>*/}

                    {/*</div>*/}
                </div>
                <div className="col-lg-6">
                    <div className={style.block}>
                        <h4>About myself </h4>
                        <div
                            className={style.bio}>{user.bio ? user.bio : 'The user did not tell anything about himself '}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;