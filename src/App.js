import React from "react";
import './App.css';
import AppRouter from "./components/Routes/AppRouter";
import HeaderContainer from "./containers/Header/HeaderContainer";
import {connect} from "react-redux";
import {checkToken} from "./store/Auth/AuthReducer";
import Footer from "./components/Footer/Footer";


class App extends React.Component {



    render() {
        if(localStorage.getItem('token')){
            this.props.checkToken(localStorage.getItem('username'))
        }else{
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('refresh')
            localStorage.removeItem('id')
        }

        return (
            <div className="App">
                <HeaderContainer/>
                <AppRouter/>
                <Footer />

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(
    mapStateToProps, {checkToken }
)(App);

