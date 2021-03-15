import React, { Component } from 'react';
import { Card, Container, Form, Button, Table } from 'react-bootstrap';
import {DATABASE_URL} from '../';
import PageWrapper from '../components/PageWrapper';
import firebase from 'firebase';
import Auth from '../components/Auth';
import {connect} from 'react-redux'
import {setIsLogged} from '../state/user'
import {spinnerProgress} from '../state/progress'
import {addSnack} from '../state/snackbars'

class Chat extends Component {
    state = {
        data: [],
        currectMessage: '',
        time: '',
        // isLogged: null,
    }
    fetchData = () => {
        // fetch
        // ---------------------------------
        // fetch(`${DATABASE_URL}/messages.json`)
        // .then(res => res.json())
        // .then(data => {
        //     const dataArr = data 
        //     ? Object.keys(data).map(key => ({id: key, ...data[key]}))
        //     : []
        //     console.log(dataArr);
        //     this.setState({ data: dataArr || []});
        // });

        firebase.database().ref('chat').on('value', snapshot => {
            const data = snapshot.val();
            // console.log(data);
            const dataArr = data ?
            Object.keys(data).map(key => ({id: key, ...data[key]}))
            : [];
            this.setState({ data: dataArr });
        })

    }
    componentDidMount() {

        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if(user) {
            this.props._setIsLogged(true)
            }
        });
        this.setState({ unsubscribe });   

        this.fetchData();
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }  

    handleInput = (e) => {
        // console.log(e.target.value)
        this.setState({ currectMessage: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log('time enter: ', new Date().toLocaleTimeString())
        // console.log(firebase.auth().currentUser.email);
        this.props._spinnerAdd()
        fetch(`${DATABASE_URL}/chat.json`,{
            method: 'POST',
            body: JSON.stringify({
                'message': this.state.currectMessage,
                'author': firebase.auth().currentUser.email,
                'time': new Date().toLocaleString(),
            })
        })
        .then(() => {
            console.log('SEND OK');
            this.setState({ currectMessage: '' });
            this.props._spinnerRemove()
            // this.fetchData();
        })
        .catch(err => {
            console.log(err)
            this.props._spinnerRemove()
        })
    }

    handleDelete = (id) => {
        console.log('Delete id = ', id);
        this.props._spinnerAdd()
        fetch(`${DATABASE_URL}/chat/${id}.json`,{
            method: 'DELETE',
        })
        .then(() => {
            console.log('Del - ok')
            this.props._spinnerRemove()
            this.props._addSnack('Delete succesful')
        })
        .catch((err) => {
            console.log(err)
            this.props._spinnerRemove()
            this.props._addSnack('Delete problem', 'danger')
        })
    }

    render() {
        console.log(this.state)
        console.log(this.props)

        // return (
            // <Auth>
        const content = (
            <PageWrapper title='Komentarze'>
                <Container>
                    {
                    // this.state.isLogged &&
                    this.props.isLogged &&
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Control 
                                type='text'
                                maxLength='80' 
                                as='textarea'
                                rows={2}
                                value={this.state.currectMessage} 
                                onChange={this.handleInput}
                            />
                            <br/>
                            <Button type='submit'>Send</Button>
                            <br/><br/>
                        </Form>
                    }

                    {
                    this.state.data.length === 0 
                    ? 
                    (
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Brak danych w Chat
                            </Card.Title>                                
                            <Card.Text>
                                W bazie brak message   
                            </Card.Text>
                        </Card.Body>
                    </Card> 
                    )
                    :
                    (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Opublikowane</th>
                            
                            {this.props.isAdmin && 
                                <>
                                <th>Bottle</th><th>Delete</th>
                                </> 
                            }
                            </tr>
                        </thead>

                        {
                        this.state.data.slice(-30).reverse().map((el, index) => (
                            <tbody key={el.id}>
                                <tr>
                                    <td>
                                        <Card key={index} style={{marginBottom: 5}}>
                                            <Card.Body>
                                                <Card.Title>
                                                    {el.author}
                                                </Card.Title>                                
                                                <Card.Text>
                                                    {el.message}
                                                    <br/>
                                                    <i>{el.time}</i>    
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </td> 
                                    {
                                    this.props.isAdmin && 
                                    <>
                                        <td style={{fontSize: 50}}>🍼 </td>
                                        <td>
                                            <Button 
                                                variant='danger'
                                                onClick={() => this.handleDelete(el.id)}
                                            >Delete</Button>
                                        </td>                                    
                                    </>                                        
                                    }

                                </tr>
                            </tbody>                                                               
                        ))
                        }
                    </Table>
                    )
                    }
                
                </Container>
            </PageWrapper>
            )                
            {/* </Auth> */}

        return this.props.isAdmin
        ?
        <Auth> {content} </Auth>
        :
        content    

    }
}

const mapStateToProps = state => ({
    isLogged: state.user.isLogged,
})
const mapDispatchToProps = ({
    _setIsLogged: setIsLogged,
    _spinnerAdd: spinnerProgress.add,
    _spinnerRemove: spinnerProgress.remove,
    _addSnack: addSnack,
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

