// imrc, cc
import React, { Component } from 'react';
import PageWrapper from '../components/PageWrapper';
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import {spinnerProgress} from '../state/progress';
import {addSnack} from '../state/snackbars';

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

    getError = (err) => {
        switch (err) {
            case 'auth/invalid-email':
                return 'email nie prawidłowy'
            case 'auth/user-not-found':
                return 'brak takiego maila'
            default:
                return 'Inny błąd'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log('Submit - Recovery password');
        // console.log(this.state.email);

        this.props._addSpinner();
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                console.log('Email reseting password was send');
                this.props._removeSpinner();
            })
            .catch((error) => {
                // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sendpasswordresetemail
                console.log('Problem to send email reseting password');
                this.props._removeSpinner();

                console.log(error);
                const text = this.getError(error.code)
                this.props._addSnack(text, 'danger'); 
            });
    }
    render() {
        // console.log(this.props);

        if(this.state.redirect === true) {
            return <Redirect to='features' />
        }
        if(firebase.auth().currentUser) {
            // console.log('User Sign In', firebase.auth().currentUser)
        } else {
            // console.log('User Sign Out', firebase.auth().currentUser)
        }
        return (
            <Container>
                <PageWrapper title='Forgot password'>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formGroupEmail">
                            <Col xl={{span: 6, offset: 3}} lg={{span: 8, offset: 2}} md={{span: 10, offset: 1}} sm={{span: 10, offset: 1}}>
                                <Form.Label >Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    // type="text" 
                                    placeholder="Enter email" 
                                    name='email' 
                                    required 
                                    value={this.state.email} 
                                    onChange={this.handleInput}
                                    autoFocus 
                                />
                                <Form.Text className="text-muted">
                                    {/* Please, enter your email to recovery account password */}
                                    Please, enter your email to recive message and reset your account password (create new password)
                                </Form.Text>                                    
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col xl={{span: 6, offset: 3}} lg={{span: 8, offset: 2}} md={{span: 10, offset: 1}} sm={{span: 10, offset: 1}}>
                                <Button variant='secondary' block type='submit'>Recovery password</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                    <Col xl={{span: 6, offset: 3}} lg={{span: 8, offset: 2}} md={{span: 10, offset: 1}} sm={{span: 10, offset: 1}}>
                        <Row>
                            <Col style={styles.Col}>
                                <Link to='sign-in'>Return to Sing In</Link>  
                            </Col>
                        </Row>
                    </Col>
                </PageWrapper>

            </Container>
        );
    }
}

const mapStateToProps = state => ({
    _spinner: state.progress.spinner,
})

const mapDispatchToProps = ({
    _addSpinner: spinnerProgress.add, 
    _removeSpinner: spinnerProgress.remove, 
    _addSnack: addSnack,
})

// export default SignIn;
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)