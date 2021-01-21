import React, { Component } from 'react';
import PageWrapper from '../components/PageWrapper';
import Auth from '../components/Auth';
import {Form, Row, Col, Button, Container, Image, Table } from 'react-bootstrap';
import firebase from 'firebase';
import {DATABASE_URL} from '..';
import {connect} from 'react-redux';
import {spinnerProgress} from '../state/progress';

const styles = {
    tdWidthLp: {width: 40},
    tdWidth: {width: '30%'},
    tdWidthDel: {textAlign: 'center'},
}

class ImgStorage extends Component {
    state = {
        user: null,
        urls: [],
        numberImg: 0,
    }

    fetchImages = () => {

        const storageRef = firebase.storage().ref();
        // console.dir(storageRef);

        var listRef = storageRef.child('avatars');
        this.props._spinnerAdd();
        listRef.listAll()
            .then((res) => {
                // console.log(res);
                // console.log(res.items);
                res.items.forEach((itemRef) => {
                    // console.log(itemRef)
                    // console.log(itemRef.location.path);

                    // metadata
                    // -----------------
                    const metaDataRef = storageRef.child(itemRef.location.path);

                    let name = '';
                    let size = '';
                    let timeCreated = '';

                    metaDataRef.getMetadata().then(function(metadata) {
                        name = metadata.name;
                        size = (metadata.size/1024).toFixed(1)+ 'kB';
                        const timeData = new Date(metadata.timeCreated)
                        timeCreated = timeData.toLocaleString();
                      }).catch(function(error) {
                        console.log(error)
                      });
                    
                    // get Url & path
                    // -----------------
                    itemRef.getDownloadURL().then(url => {
                        // console.log(url);

                        this.setState({ 
                            urls: 
                                [
                                    ...this.state.urls, 
                                    {
                                        url: url, 
                                        path: itemRef.location.path,
                                        name: name,
                                        size: size,
                                        timeCreated,
                                    }
                                ],
                        });
                    })
                });
                // console.log(res.items.length)
                this.setState({ numberImg: res.items.length});
                this.props._spinnerRemove();
            })
            .catch((error) => {
                this.props._spinnerRemove();
            });
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

    handleDelete = (path) => {
        console.log('Delete');
        console.log('path ',path);
        this.props._spinnerAdd();

        const storageRef = firebase.storage().ref();

        var listRef = storageRef.child('avatars');
        console.log(listRef);

        var storageRefChild = storageRef.child(path);
        console.log(storageRefChild);

        storageRefChild.delete()
            .then(() => {
                console.log('Image deleted');
                this.setState({ urls: [] });
                this.fetchImages();
                this.props._spinnerRemove();
            })
            .catch(err => {
                console.log('Image not deleted', err);
                this.props._spinnerRemove();
            });
    }

    render() {

        return (
        <Auth>
            <PageWrapper title='ImgStorage'>
                <Container>

                    <br/>
                    <h2>Number of images: {this.state.numberImg}</h2>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Lp</th>
                        <th>Image</th>
                        <th>Info img</th>
                        <th>Action Storage</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.urls.map((item, index) => 
                        (
                        <tr key={item.name}>
                            <td style={styles.tdWidthLp}>{index + 1}</td>
                            <td style={styles.tdWidth}>
                                <Image src={item.url} className='img-fluid rounded' 
                                    style={{maxWidth: '100%', outline: '2px solid #eee'}}/>
                            </td>
                            <td>
                                <div style={{fontWeight: 'bold'}}>{item.name}</div>
                                <div>{item.size}</div>
                                <div>{item.timeCreated}</div>
                            </td>
                            <td style={styles.tdWidthDel}>
                                <Button onClick={() => this.handleDelete(item.path)}>Delete</Button>
                            </td>              
                        </tr>                      
                        ))
                    }
                    </tbody>
                    </Table>
                    <br/>
                </Container>                 
            </PageWrapper>
        </Auth>            
        )
    }
}
const mapDispatchToProps = ({
    _spinnerAdd: spinnerProgress.add,
    _spinnerRemove: spinnerProgress.remove,
})
export default connect(null, mapDispatchToProps)(ImgStorage);
