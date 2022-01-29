import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from "../../pages/Main/Main.module.css";
import {Link} from "react-router-dom";
import photo from "../../assets/images/unnamed.png";
import {requestContinueRead} from "../../store/Main/MainReducer";
import {BOOK_ROUTE, READER_ROUTER} from "../../routing/consts";
import {nameLengthSlice} from "../../utils/customFunc";

function mapStateToProps(state) {
    return {
        data: state.PopularReducer.continueRead,
        isFetching: state.PopularReducer.isFetching
    };
}


class ContinueRead extends Component {
    componentDidMount() {
        this.props.requestContinueRead();
    }

    render() {
        return (
            <>
                {
                    this.props.data.book ? <div className={style.books + ' ' + style.readCont + '  text-center mt-4 ps-0'}>
                        <h3  className={style.authorOfDay + ' p-2'}><i className="fas fa-book" /> Continue reading... </h3>
                        <Link to={READER_ROUTER+'/'+this.props.data.book.id+'/'+this.props.data.id}>
                            <img
                                src={this.props.data.book.cover ? process.env.REACT_APP_API_URL_NO_SLASH+ this.props.data.book.cover : photo}
                                alt="" style={{width: 160}}/>
                        </Link>
                        <Link to={BOOK_ROUTE+'/'+this.props.data.book.id}><h6 className=' mt-3 mb-4'>{nameLengthSlice(this.props.data.book.name,60)}</h6></Link>
                        <Link to={READER_ROUTER+'/'+this.props.data.book.id+'/'+this.props.data.id}><h6 className='text-secondary mt-3 mb-4'>{nameLengthSlice(this.props.data.name,50)}</h6></Link>
                    </div> : null
                }

            </>
        );
    }
}

export default connect(
    mapStateToProps, {requestContinueRead}
)(ContinueRead);