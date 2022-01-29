import React from 'react';
import photo from './../../../assets/images/unnamed.png'
import {Link} from "react-router-dom";
import {BOOK_ROUTE} from "../../../routing/consts";

const ModerationItem = ({chapter, verify}) => {
    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-2">
                    <img src={chapter?.cover ? chapter.cover : photo} alt=""/>
                </div>
                <div className="col-lg-10 position-relative pb-5">
                    <Link to={BOOK_ROUTE+'/'+chapter.id}><h3 ><i>{chapter.name}</i></h3></Link>
                    <p><b>Created:</b> {chapter.date}</p>
                    <hr/>
                    <p>{chapter.description}</p>

                       <div style={{position:'absolute', bottom:0, right:0, width: '100%', textAlign: 'center'}} >
                           {/*<button className='btn btn-secondary w-25 me-4'>For re-editing</button>*/}
                           <button onClick={() => verify(chapter.id, {
                               on_verification: null,
                               verified: false
                           })} className='btn me-4  btn-danger w-25'>Reject
                           </button>
                           <button onClick={() => verify(chapter.id, {
                               on_verification: null,
                               verified: true
                           })} className='btn btn-success w-25'>Accept
                           </button>
                       </div>


                </div>
            </div>
            <hr/>
            <div style={{backgroundColor: 'lightgray', height: '10px'}} />
            <hr/>
        </div>
    );
};

export default ModerationItem;