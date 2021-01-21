import React, { Component } from 'react';
import PageWrapper from '../components/PageWrapper';
import Auth from '../components/Auth';
import {Form, Row, Col, Button, Container, Image, Table, Modal } from 'react-bootstrap';
import firebase from 'firebase';
import {DATABASE_URL} from '..';
import AuthAdmin from '../components/AuthAdmin';
import {spinnerProgress} from '../state/progress';
import {addSnack} from '../state/snackbars';
import { connect } from 'react-redux';
import imgNo from '../images/imgNo.png';
import '../styles/ImgDatabase.css';

const styles = {
    tdWidthLp: {width: 40},
    tdWidth: {width: '30%'},
    tdWidthDel: {textAlign: 'center'},
}

class ImgDatabase extends Component {
    state = {
        user: null,
        numberImg: 0,
        images: [],
        isOpen: false,
        id: '', 
        path: '',
    }

    fetchImages = () => {
        this.props._spinnerAdd();
        fetch(`${DATABASE_URL}/images.json`)
        // fetch(`${DATABASE_URL}/image`)  // error
        .then(res => {
            // console.log(res);
            return res.json()
        })
        .then(data => {
            // console.log(data);
            const dataArr = data ? 
            Object.keys(data).map(item => ({id: item, ...data[item]})) : [];
            // console.log(dataArr);
            this.setState({ images: dataArr });
            this.setState({ numberImg: dataArr.length});
            this.props._spinnerRemove();
            this.props._addSnack('got data successfully');
        })
        .catch(err => {
            console.log(err);
            this.props._spinnerRemove();
            this.props._addSnack(''+err, 'danger');
        })
    }

    componentDidMount() {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            this.setState({
                user
            });
            if (user) {
                this.fetchImages();
            }
        });
        this.setState({
            unsubscribe
        })
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    // Database delete
    deleteDataBase =(id, path) => {
        fetch(`${DATABASE_URL}/images/${id}.json`,{
        // fetch(`${DATABASE_URL}/images/${id}.jso`,{  // error
            method: 'DELETE',
            })
            .then(() => {
                console.log('Database Image deleted');
                this.props._spinnerRemove();
                this.props._addSnack('Database Image deleted');
                this.fetchImages();
            })
            .catch(err => {
                console.log('Database Image NOT deleted');
                this.props._spinnerRemove();
                this.props._addSnack('Database Image NOT deleted', 'danger');
                // Storage delete
                // this.deleteStorage(id, path);
            })
    }

    // Storage delete 
    deleteStorage = (id, path) => {
        const storageRef = firebase.storage().ref();

        var storageRefChild = storageRef.child(path);
        // var storageRefChild = storageRef.child('aaa');   // error
        // console.log(storageRefChild);

        storageRefChild.delete()
            .then(() => {
                // console.log('Storage Image deleted');
                this.props._addSnack('Storage Image deleted');
                this.deleteDataBase(id);
            })
            .catch(err => {
                // console.log('Storage Image NOT deleted', err);
                this.props._spinnerRemove();
                this.props._addSnack('Storage Image NOT deleted', 'danger');
                const deleted = false;
                this.deleteDataBase(id, path);
            });        
    }

    // Storage delete image & Database delete
    handleDelete = (id, path) => {
        // console.log('Delete id ', id);
        // console.log('Delete path', path);
        this.props._spinnerAdd();

        // Storage delete
        this.deleteStorage(id, path);
    }

    openModal = (id, path) => {
        this.setState({ id: id, path: path });
        this.setState({ isOpen: true });
    }

    closeModal = () => {
        this.setState({ isOpen: false });
    }

    modalDelete = () => {
        this.handleDelete(this.state.id, this.state.path);
        this.setState({ isOpen: false });
    }

    render() {
        // console.log(this.props)
        return (
        <AuthAdmin>
            <PageWrapper title='ImgDatabase'>
                <Container>

                    <br/>
                    <h2>Number of images: {this.state.numberImg}</h2>
                    <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>Lp</th>
                        <th>Image</th>
                        <th>Info img</th>
                        <th style={{width: 50}}>Action firebase</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.images.map((item, index) => 
                        (
                        <React.Fragment key={item.id}>
                        <tr>
                            <td style={styles.tdWidthLp} rowSpan='2'>
                                {index + 1}
                            </td>
                            <td style={styles.tdWidth}>
                                <Image src={item.url} className='img-fluid rounded' 
                                    style={{maxWidth: '100%', outline: '2px solid #eee'}}
                                    alt={item.nameFile}
                                    onError={evt => evt.target.src = imgNo}
                                />
                            </td>
                            <td className='imgInfo'>
                                <div style={{fontWeight: 'bold'}}>{item.nameFile}</div>
                                <div>{item.sizeFile}</div>
                                <div>{item.timeFile}</div>
                            </td>
                            <td style={styles.tdWidthDel} rowSpan='2'>
                                <Button 
                                    variant='danger' 
                                    // onClick={() => this.handleDelete(item.id, item.path)}
                                    onClick={() => this.openModal(item.id, item.path)}
                                >Delete</Button>
                            </td>              
                        </tr> 
                        <tr>
                            <td colSpan='2'>
                            <h4 className='textImgDatabase'>{item.title}</h4>
                            <div className='textImgDatabase'>{item.describe}</div>
                            </td>
                        </tr>                       
                        </React.Fragment>
                        ))
                    }
                    {         
                    this.state.images.length < 1 && 
                        <tr><td colSpan={4} style={{textAlign: 'center'}}>No images</td></tr>
                    }
                    </tbody>
                    </Table>
                    <br/>

                    <Modal show={this.state.isOpen} onHide={this.closeModal} transition='Fade'>
                        <Modal.Header closeButton>
                            <Modal.Title>Do you want to delete it?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Użycie Delete spowoduje trwałe usunięcie</Modal.Body>
                            <Modal.Footer>
                        <Button 
                            variant="danger" 
                            onClick={this.modalDelete}
                        >
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        </Modal.Footer>
                    </Modal>

                </Container>                 
            </PageWrapper>
        </AuthAdmin>            
        )
    }
}

const mapDispatchToProps = ({
    _spinnerAdd: spinnerProgress.add,
    _spinnerRemove: spinnerProgress.remove,
    _addSnack: addSnack,
})
export default connect(null, mapDispatchToProps)(ImgDatabase);
