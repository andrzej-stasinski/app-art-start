import React from 'react';
import PageWrapper from '../components/PageWrapper';
import {Alert} from 'react-bootstrap';
import imgNo from '../images/imgNo.png';

const styles = {
    divAlert: {
        margin: '0 auto',
        maxWidth: 480,
    },
    back: {
        textDecoration: 'underline',
        color: 'gray',
        cursor: 'pointer',
        textAlign: 'center',
    },
    divContainer: {
        maxWidth: 600,
        // outline: '1px solid red',
        // marginBottom: 80,
        margin: 'auto',
        padding: 10,
        // paddingBottom: 40,
        boxShadow: '0 0 10px black',
    },
    divImg: {
        // outlin: '5px solid green',
        boxShadow: '0 0 5px black',
    },
    img: {
        width: '100%',
        // outline: '2px solid blue',
        backgroundImage: 'url(' + imgNo + ')', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
    },
    body: {
        marginTop: 20,
    }
}
const ImgSingle = (props) => {
    // console.log(props);
    if(!props.data) {
    return (
        <PageWrapper title='Img Single'>
            <div style={styles.divAlert}>
                <Alert variant='danger' 
                >There aren't any image for id = {props.id}</Alert>
                <br/>
                <h5 onClick={props.back} style={styles.back}>Back to all images</h5>                
            </div>
        </PageWrapper>
        )        
    }
    return (
        <PageWrapper title='Img Single'>
            <div style={styles.divContainer}>
                <div style={styles.divImg}>
                    <img 
                        src={props.data.url} 
                        // src='' 
                        alt={props.data.name} 
                        onError={event => event.target.src = imgNo}
                        style={styles.img}
                    />
                </div>
                <div style={styles.body}>
                    <h4>{props.data.title}</h4>
                    <div>{props.data.describe}</div>
                </div>
                <br/>
                <h5 onClick={props.back} style={styles.back}>Back to all images</h5>         
            </div>
        </PageWrapper>
        )        
}

export default ImgSingle
