// imrc, cc
import React, { Component } from 'react';
import PageWrapper from '../components/PageWrapper';
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {spinnerProgress} from '../state/progress';
import {addSnack} from '../state/snackbars';
import {setIsLogged, addUser} from '../state/user'

const styles = {
    Col: {
        textAlign: 'center'
    }
}
class SignIn extends Component {

    state = {
        redirect: false,
        email: '',
        password: '',
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    getErrorCreate = (err) => {
        switch (err) {
            case 'auth/email-already-in-use':
                return 'Taki mail już istnieje'
            case 'auth/invalid-email':
                return 'Adres email nieprawidłowy'
            case 'auth/operation-not-allowed':
                return 'Konto wyłączone'
            case 'auth/weak-password':
                return 'Hasło jest za słabe'
            default:
                return 'Inny błąd'
        }
    }

    getErrorSign = (err) => {
        switch (err) {
            case 'auth/invalid-email':
                return 'email nie prawidłowy'
            case 'auth/user-disabled':
                return 'Konto wyłączone'
            case 'auth/user-not-found':
                return 'Nie ma takiego maila'
            case 'auth/wrong-password':
                return 'Błędne hasło'
            default:
                return 'Inny błąd'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(firebase);
        if(this.props.isSignUp) {
            this.props._addSpinner();
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                // console.log(res);
                // console.log('uid ',res.user.uid);
                // console.log('refreshToken ', res.user.refreshToken)
                this.props._setIsLogged(true)
                this.props._addUser(res.user.email);
                this.setState({ redirect: true });
                this.props._removeSpinner();
            })
            .catch(error => {
                // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
                console.log('Not Sign Up');
                this.props._removeSpinner();

                // Handle Errors here.
                console.log(error);
                const text = this.getErrorCreate(error.code)
                this.props._addSnack(text, 'danger');               
            });
        } else {
            this.props._addSpinner();
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(data => {
                console.log(data);
                console.log('Sign In');
                this.props._setIsLogged(true)
                this.props._addUser(data.user.email);
                this.setState({ redirect: true });
                this.props._removeSpinner();
            })
            .catch(error => {
                // console.log(err);
                console.log('NOT Sign In');
                this.props._removeSpinner();

                // Handle Errors here.
                console.log(error);
                const text = this.getErrorSign(error.code)
                this.props._addSnack(text, 'danger');                
            });
        }

    }
    render() {
        // console.log(this.props);

        if(this.state.redirect === true) {
            return <Redirect to='/' />
        }
        if(firebase.auth().currentUser) {
            // console.log('User Sign In', firebase.auth().currentUser)
        } else {
            // console.log('User Sign Out', firebase.auth().currentUser)
        }
        return (
            <Container>
                <PageWrapper title={this.props.isSignUp ? 'Sign Up' : 'Sign In'}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formGroupEmail">
                            <Col xl={{span: 6, offset: 3}} lg={{span: 8, offset: 2}} md={{span: 10, offset: 1}} sm={{span: 10, offset: 1}}>
                                <Form.Label >Email address</Form.Label>
                                <Form.Control type="email" 
                                    placeholder="Enter email" 
                                    name='email' 
                                    value={this.state.email} 
                                    onChange={this.handleInput}
                                    autoFocus 
                                    required 
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Col xl={{span: 6, offset: 3}} lg={{span: 8, offset: 2}} md={{span: 10, offset: 1}} sm={{span: 10, offset: 1}}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" 
                                    name='password' 
                                    value={this.state.password} 
                                    onChange={this.handleInput} 
                                    minLength={6}
                                    required 
                                /> 
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col xl={{span: 6, offset: 3}} lg={{span: 8, offset: 2}} md={{span: 10, offset: 1}} sm={{span: 10, offset: 1}}>
                                {
                                this.props.isSignUp
                                ?
                                <Button variant='primary' block type='submit'>Sign Up</Button>
                                :
                                <Button variant='success' block type='submit'>Sign In</Button>
                                }
                            </Col>
                        </Form.Group>
                    </Form>
                    <Col xl={{span: 6, offset: 3}} lg={{span: 8, offset: 2}} md={{span: 10, offset: 1}} sm={{span: 10, offset: 1}}>
                        <Row>
                            <Col style={styles.Col}>
                                <Link to='forgot'>Forgot password</Link>
                            </Col>
                            <Col style={styles.Col}>
                                {
                                this.props.isSignUp
                                ?
                                <Link to='sign-in'>Already have an account? Sign In</Link>
                                :
                                <Link to='sign-up'>Don't have an account? Sign Up</Link>
                                }
                                
                            </Col>
                        </Row>
                    </Col>
                </PageWrapper>

            </Container>
        );
    }
}
const mapStateToProps = state => ({
    spinner: state.progress.spinner,
})
const mapDispatchToProps = ({
    _addSpinner: spinnerProgress.add,
    _removeSpinner: spinnerProgress.remove,
    _addSnack: addSnack,
    _setIsLogged: setIsLogged,
    _addUser: addUser,
})
// export default SignIn;
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)