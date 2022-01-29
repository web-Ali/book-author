import React from 'react';
import {useHistory} from "react-router-dom";

const Exit = () => {
    const history = useHistory();


    const exit = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        localStorage.removeItem('id')
        localStorage.removeItem('username')
        history.go(0)
    };

    return (
        <div className='text-center p-5'><span className='btn btn-danger' onClick={exit}>Exit accounting record</span></div>
    );
};

export default Exit;