import React from 'react';
import imgNo from '../../images/imgNo.png';

const styles = {
    divImg: {
        width: 240,
        height: 240,
        outline: '1px solid green',
        cursor: 'pointer',
        margin: 10,
        position: 'relative',
        overflow: 'hidden',
    },
    img: {
        minWidth: '100%', height: '100%',
        outline: '1px solid blue',
        backgroundImage: 'url('+imgNo+')',
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        transition: '500ms',        
    },
    divTitle: {
        height: '40%', width: '100%',
        backgroundColor: 'rgba(30,30,30,0.5)',
        position: 'absolute',
        bottom: 0,
    },
    title: {
        color: '#fff',
        marginTop: 20,
        marginLeft: 20, fontWeight: 'bold',
    }
}
const ImagesListItem = (props) => {
    // console.log(props)
    return (
        <div style={styles.divImg} onClick={() => {
                props.changeRoute('/img-show/'+props.data.id);
                window.scroll({top: 0,behavior: 'smooth',})
            }}>
            <img 
                src={props.data.url} 
                // src={imgNo} 
                style={styles.img} 
                className='images-list-item__img'
                onError={evt => evt.target.src = imgNo}
                alt={props.data.name} 
            />
            <div style={styles.divTitle}>
                <div style={styles.title}>{props.data.title}</div>
            </div>
        </div>
    )
}

export default ImagesListItem
