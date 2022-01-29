import React from 'react';
import {connect} from "react-redux";
import {requestPopular,requestBestsellers,requestHot} from "../../store/Main/MainReducer";
import MainSlider from "../../components/Main/MainSlider";

class SliderContainer extends React.Component {

    componentDidMount() {
        if (this.props.type === 'hot'){
            this.props.requestHot();
        }else if (this.props.type === 'popular'){
            this.props.requestPopular();
        }else if(this.props.type === 'bestsellers'){
            this.props.requestBestsellers();
        }
    }


    render() {


        return (


                <MainSlider data={this.props[this.props.type]} isFetching={this.props.isFetching}/>

        );
    }
};
let mapStateToProps = (state) => {
    return {
        hot: state.PopularReducer.hot,
        popular: state.PopularReducer.popular,
        bestsellers: state.PopularReducer.bestsellers,
        isFetching: state.PopularReducer.isFetching
    }
}


export default connect(mapStateToProps, { requestPopular,requestBestsellers,requestHot})(SliderContainer)
