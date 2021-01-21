import React, { Component } from 'react';
import firebase from 'firebase';
import PageWrapper from './PageWrapper';

class Auth extends Component {
    // Do testów
    // -----------------
    // state = {
    //     user: true,
    // }

    state = {
        user: null,
    }

    componentDidMount() {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            this.setState({ user: user });
        });
        this.setState({
            unsubscribe
        })        
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }    

    render() {
        // {console.log('user: ',this.state.user)}
        return this.state.user
        ? this.props.children
        : <PageWrapper title='Please log in' />
    }
}

export default Auth;

