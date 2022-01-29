import React, {useState} from 'react';

const AddAnswerCommentBook = ({addCom, comId ,username,offAnswerInput}) => {
    const [text,setText] = useState();
    const send = () =>{
        if (text){

            addCom(text, comId)
            setText('')
            offAnswerInput(false)
        }

    }
    return (
        <div>
            <div className=''>
                <textarea defaultValue={username+', '} onChange={(e)=>setText(e.target.value)} className="form-control" rows="3"/>
                <div className='text-end'>
                    <button onClick={send} className='btn btn-primary mt-2 '>Отправить</button>
                </div>
            </div>
        </div>
    );
};

export default AddAnswerCommentBook;