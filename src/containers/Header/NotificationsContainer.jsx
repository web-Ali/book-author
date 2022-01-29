import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestNotifications} from "../../store/Profile/ProfileReducer";
import Notifications from "../../components/Header/Notifications";

function mapStateToProps(state) {
    return {
        notifications: state.ProfileReducer.notifications
    };
}



class NotificationsContainer extends Component {
    componentDidMount() {
        if (localStorage.getItem('username')){
            this.props.requestNotifications('all')
        }
    }

    render() {
        return (
            <div>
                <Notifications requestNotifications={this.props.requestNotifications} notifications={this.props.notifications} offModal={this.props.offModal} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,{requestNotifications}
)(NotificationsContainer);