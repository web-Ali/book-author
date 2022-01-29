import React from 'react';
import style from './Loader.module.css'
const Loader = ({fix = true}) => {
    return (
        <div className={fix ? style.wrapper : null }>
            <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;