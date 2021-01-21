import React, { Component } from 'react';
import PageWrapper from '../components/PageWrapper';
import AuthAdmin from '../components/AuthAdmin';
import {Form, Row, Col, Button, Container, Image} from 'react-bootstrap';
import firebase from 'firebase';
import {DATABASE_URL} from '../index';
import {connect} from 'react-redux';
import {spinnerProgress} from '../state/progress';
import {addSnack} from '../state/snackbars';

// Attention
// image dodawany o nazwie np. img1, 
// jeśli o takiej nazwie img1 istnieje w Storage
// to nie zapisze się drugi o takiej samej nazwie
// powoduje to, że zapis w bazie będzie bez nazwy img1 w url

const styles = {
    divImg: {
        width: 100,
    }
}

class FormApp extends Component {
    state = {
        file: null,
        user: null,
        url: '',
        fileName: '',
        urls: [],
        title: '',
        describe: '',
    }

    fetchAvatar1 = () => {
        if(this.state.fileName) {
            firebase.storage().ref('avatars/' + this.state.fileName)
                .getDownloadURL()
                .then(url => {
                    // console.log(url);
                    this.setState({
                        url
                    })
                });            
        }
    }

    componentDidMount() {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            this.setState({
                user
            });
            if (user) {
                // this.fetchAvatar2();
            }
        });
        this.setState({
            unsubscribe
        })
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    // file INPUT
    handleOnChange = (event) => {
        // console.log(event.target.files[0]);
        if(event.target.files[0]) {
            this.setState({
                file: event.target.files[0],
                fileName: event.target.files[0].name
            }, () => {
                console.log('Wykonano');
            });            
        } else {
            console.log('Zrezygnowano');
        }
    }

    // text INPUT
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }  

    // Submit
    handleSubmit = (e) => {
        // console.log('Submit', e);
        e.preventDefault(); 

        // console.log(this.props);
        this.props._addSpinner();

        const uploadTask = firebase.storage()
            .ref('avatars/' + this.state.fileName)
            .put(this.state.file);

        uploadTask
        .on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progress = progress.toFixed(1);
                console.log('Upload is ' + progress + '% done');
                this.props._addSnack(`Upload is  ${progress} % done`, 'primary');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running...');
                    this.props._addSnack(`Upload is running...`, 'primary');
                    break;
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        this.props._addSnack(`Upload is paused`, 'primary');
                    break;
                    }
            }, 
            (error) => {
                // Handle unsuccessful uploads
                console.log(error)
                switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    this.props._addSnack(`User doesn't have permission to access the object`, 'orange');
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    this.props._addSnack(`User canceled the upload`, 'orange');
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    this.props._addSnack(`Unknown error occurred, inspect error.serverResponse`, 'orange');
                    break; 
                }               
            },
            () => {
                uploadTask.then(snapshot => {
                
                    console.log('Zapis image');
                    this.fetchAvatar1();
                    // console.log(snapshot);
                    // console.log(snapshot.metadata);
                    const nameFile = snapshot.metadata.name;
                    const sizeFile = (snapshot.metadata.size/1024).toFixed(1)+ 'kB';
                    const timeData = new Date(snapshot.metadata.timeCreated)
                    const timeFile = timeData.toLocaleString(); 
                    const path     = snapshot.metadata.fullPath;

                    snapshot.ref.getDownloadURL().then(url => {
                        // console.log(url);

                        // form
                        // ----------
                        const form = {
                            title: this.state.title,
                            describe: this.state.describe,
                            url: url,
                            nameFile: nameFile,
                            sizeFile: sizeFile,
                            timeFile: timeFile,
                            path: path,
                        }
                        // console.log('form', form);

                        // database
                        fetch(`${DATABASE_URL}/images.json`,{
                        // fetch(`${DATABASE_URL}/images`,{           // error
                            method:'POST',
                            body:JSON.stringify(form),
                            })
                            .then((res) => {
                                // console.log(res)
                                if(res.ok === false) throw Error(res.status)
                                console.log('Zapis form');
                                // reset form
                                // ----------
                                this.setState({ title: '', describe: '', file: null });
                                document.querySelector('#custom-file').value = '';
                                this.props._removeSpinner();
                                this.props._addSnack('Upload success')
                            })
                            .catch(err => {
                                // console.log(err);
                                console.log('Zapis form - no');
                                this.props._addSnack('Data '+err, 'danger');
                                this.props._removeSpinner();

                                const storageRef = firebase.storage().ref();
                                storageRef.child(path).delete()
                                    .then(() => {
                                        console.log('Image deleted');
                                        this.setState({ url: null });
                                        this.props._addSnack('Image deleted', 'danger');
                                    })
                                    .catch(err => {
                                        console.log('Image not deleted', err);
                                        this.props._addSnack('Image not deleted', 'danger');
                                    });                                
                            });                   
                    })
                })            
            }
        )
    }

    handleReset = () => {
        this.setState({ title: '', describe: '', file: null });
    }

    render() {
        // console.log(this.props)
        return (
        <AuthAdmin>
            <PageWrapper title='FormApp'>
                <Container>
                    <Row>
                        <Col lg={{span:6, offset: 3}} md={{span:8, offset: 2}} sm={{span:10, offset: 1}} style={{outline: '2px solid #eee'}}>
                            <h2>Form</h2>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        name='title' 
                                        required 
                                        maxLength='30'
                                        placeholder='Enter title'
                                        value={this.state.title} 
                                        onChange={this.handleInput} 
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Describe</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        as='textarea' 
                                        name='describe' 
                                        rows={4}
                                        required 
                                        maxLength='200'
                                        placeholder='Enter description' 
                                        value={this.state.describe} 
                                        onChange={this.handleInput} 
                                    />
                                </Form.Group>
                                <div>
                                {
                                    this.state.file 
                                    ? 
                                    <div>
                                        <div>
                                            Wybrano file:  {this.state.file.name}    
                                        </div>
                                        <div>
                                            Size: {(Number(this.state.file.size)/1024).toFixed(1)} kB   
                                        </div>
                                    </div>
                                    : null
                                }
                                </div>                             
                                <Form.Control 
                                    id="custom-file" required type='file'
                                    label={this.state.file ? null : "Choose file image... click here"}
                                    // custom
                                    onChange={this.handleOnChange}
                                />
                                <br/>
                                <Button type='submit'>Add Form</Button>{' '}
                                <Button type='reset' variant='secondary' 
                                    onClick={this.handleReset}
                                >Reset</Button> 
                            </Form>
                            <br/>                                       
                        </Col>
                    </Row> 
                    <br/>
                    <Row>
                        <Col 
                            lg={{span:6, offset: 3}} 
                            md={{span:8, offset: 2}} 
                            sm={{span:10, offset: 1}} 
                            // style={{outline: '2px solid #eee'}}
                        >
                        {this.state.url &&
                            <>
                            <Image src={this.state.url} className='img-fluid rounded' 
                                style={{maxWidth: '100%', outline: '2px solid #eee'}}/>                            
                            </>
                        }
                        </Col>                    
                    </Row>
                    <br/>

                </Container>                 
            </PageWrapper>
        </AuthAdmin>            
        )
    }
}

const mapStateToProps = state => ({
    progress: state.progress,
})
const mapDispatchToProps = ({
    _addSpinner: spinnerProgress.add,
    _removeSpinner: spinnerProgress.remove,
    _addSnack: addSnack,
})
export default connect(mapStateToProps, mapDispatchToProps)(FormApp);
