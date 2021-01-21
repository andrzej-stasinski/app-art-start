import React, { Component } from 'react';
import firebase from 'firebase';
import PageWrapper from './PageWrapper';
import {connect} from 'react-redux';
import {addUser} from '../state/user';
import {admin} from '../const/admin';

class AuthAdmin extends Component {

    state = {
        user: null,
    }

    componentDidMount() {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            // console.log(user);
            // console.log(user.email)
            // this.setState({ user: user });
            this.props._addUser(user.email);
        });
        this.setState({
            unsubscribe
        })        
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }    

    render() {
        // console.log(this.props);
        // console.log(admin);
        
        return this.props.user === process.env.REACT_APP_ADDRESS_EMAIL
        ? this.props.children
        : <PageWrapper title='Please log in as Admin' />
        // return this.state.user
        // ? this.props.children
        // : <PageWrapper title='Please log in as Admin' />
    }
}
const mapStateToProps = state => ({
    user: state.user.user,
});
const mapDispatchToProps = ({
    _addUser: addUser,
})
export default connect(mapStateToProps, mapDispatchToProps)(AuthAdmin);

