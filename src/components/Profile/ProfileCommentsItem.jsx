import React, {useState} from 'react';
import style from "../Book/Book.module.css";
import photoProfile from "../../assets/images/profile.jpg";
import AddAnswerCommentProfile from "./AddAnswerCommentProfile";
import ProfileCommentsChilds from "./ProfileCommentsChilds";
import ModalAccept from "../UI/ModalAccept";
import {Link} from "react-router-dom";
import {USER_ROUTE} from "../../routing/consts";

const ProfileCommentsItem = ({item,addCom,deleteThisComment,username}) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showChilds, setShowChilds] = useState(false);

    function offAnswerInput (bul) {
        setShowAnswer(bul)
    }

    function deleted () {
        deleteThisComment(item.id, username)
    }

    return (
        <div className={style.comWrap + ' row ps-sm-2 ps-0 mt-3 mb-3 ms-0'}>
            <div className={style.photoprofile + ' col-xl-2 col-lg-3 col-sm-2 col-3 p-0 p-0'}>
                <Link to={USER_ROUTE + '/' + item?.user.username} ><img src={item?.user?.image ? item.user.image : photoProfile} alt=""/></Link>
            </div>
            <div className="ms-lg-3  col-xl-10 col-lg-9 col-sm-10 col-9">
                <div className={style.usernameCom}>
                    <Link to={USER_ROUTE+'/'+item?.user?.username}>{item.user.fullname}</Link>
                    <span>{item.created_at.substr(0, 10)
                +' ' + item.created_at.substr(11, 8)}</span></div>
                <div className={style.textCom}>{item.text}
                    {
                        showAnswer
                            ?
                            <div>
                                <div onClick={() => setShowAnswer(false)}  className={style.closeCom}>x</div>
                                <AddAnswerCommentProfile offAnswerInput={offAnswerInput} addCom={addCom} commentId={item.id} username={item.user.username}/>
                            </div>
                            :
                            null
                    }
                </div>
                <div className='d-flex mt-2'>
                    <div onClick={() => setShowAnswer(true)} className={style.answer}>Answer</div>
                    {(localStorage.getItem('username') === item.user.username ||
                        username === localStorage.getItem('username')) &&
                    <ModalAccept
                        button={<div className={style.deleteCom}>Delete</div>}
                        text={'Delete comment?'}
                        desc={'All comments on this thread will be deleted.'}
                        call={deleted}
                    />
                    }
                </div>

                {item?.childs && item.childs.length ?
                    <div>
                        <div>
                            {showChilds ?
                                <div>
                                    <div className={style.hiddenAnswer} onClick={() => setShowChilds(false)}><i
                                        className="fas fa-sort-up"/> Hide answers
                                    </div>
                                    <div>
                                        <ProfileCommentsChilds username={username} deleteThisComment={deleteThisComment}  addCom={addCom} commentId={item.id} childs={item.childs}/>
                                    </div>
                                </div>
                                :
                                <div className={style.showAnswer} onClick={()=>setShowChilds(true)}><i className="fas fa-sort-down"/>
                                    <span>Show answers</span></div>
                            }


                        </div>

                    </div>
                    :
                    null
                }

            </div>
        </div>
    );
};

export default ProfileCommentsItem;