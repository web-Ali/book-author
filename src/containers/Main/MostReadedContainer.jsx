import React from 'react';
import {connect} from "react-redux";
import { requestMostReaded} from "../../store/Main/MainReducer";
import MostReadedSlider from "../../components/Main/MostReadedSlider";

class MostReadedContainer extends React.Component {

    componentDidMount() {
        this.props.requestMostReaded();
    }


    render() {


        return (
            <MostReadedSlider data={this.props.mostreaded} isFetching={this.props.isFetching}/>
        );
    }
};
let mapStateToProps = (state) => {
    return {
        mostreaded: state.PopularReducer.mostreaded,
        isFetching: state.PopularReducer.isFetching
    }
}


export default connect(mapStateToProps, { requestMostReaded})(MostReadedContainer)
