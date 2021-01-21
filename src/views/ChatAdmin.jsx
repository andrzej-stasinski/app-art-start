import React, { Component } from 'react';
import { Card, Container, Form, Button, Table } from 'react-bootstrap';
import {DATABASE_URL} from '../';
import PageWrapper from '../components/PageWrapper';
import firebase from 'firebase';
import Auth from '../components/Auth';

class ChatAdmin extends Component {
    state = {
        data: [],
        currectMessage: '',
        time: '',
    }
    fetchData = () => {

        firebase.database().ref('messages').on('value', snapshot => {
            const data = snapshot.val();
            // console.log(data);
            const dataArr = data ?
            Object.keys(data).map(key => ({id: key, ...data[key]}))
            : [];
            this.setState({ data: dataArr });
        })

    }
    componentDidMount() {
        this.fetchData();
    }

    handleInput = (e) => {
        // console.log(e.target.value)
        this.setState({ currectMessage: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log('time enter: ', new Date().toLocaleTimeString())
        // console.log(firebase.auth().currentUser.email);
        fetch(`${DATABASE_URL}/messages.json`,{
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
            // this.fetchData();
        })
    }

    deleteRecord = (id) => {
        console.log('deleteRecord id=', id)
        console.log(DATABASE_URL)
        fetch(`${DATABASE_URL}/messages/${id}.json`,{
            method: 'DELETE',
        })
        .then(() => {
            console.log('Delete OK')
        })
        .catch((err) => console.log('Delete No'))
    }

    render() {
        // console.log(this.state);

        return (
            <Auth>
                <PageWrapper title='Chat'>
                    <Container>
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
                        </Form>
                        <hr/>
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
                        <table className='table table-striped table-bordered table-hover'>
                            <thead>
                                <tr><th>Opublikowane</th><th>Delete</th></tr>
                            </thead>
                            <tbody>
                            {
                            this.state.data.slice(-10).reverse().map((el, index) => (
                                <tr key={index}>
                                    <td>
                                    <Card style={{marginBottom: 5}}>
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
                                    <td style={{width: '50px'}}>
                                        <Button variant='danger' onClick={() => this.deleteRecord(el.id)}>DELETE</Button>
                                    </td> 
                                </tr>
                                ))
                            }                                
                            </tbody>                           
                        </table>                                
                        )
                        }
                    
                    </Container>
                </PageWrapper>                
            </Auth>

        );
    }
}

export default ChatAdmin;

