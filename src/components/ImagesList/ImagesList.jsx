import React from 'react';
import ImagesListItem from './ImagesListItem';

const styles = {
    container: {
        maxWidth: 900,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 'auto',
        outline: '1px solid red',
    }
}
const ImagesList = (props) => {
    // console.log(props);
    return (
        <div style={styles.container}>
            {
            props.data.map(item => (
                <ImagesListItem key={item.id} 
                    data={item} 
                    changeRoute={props.changeRoute}
                />
            ))
            }
        </div>
    )
}

export default ImagesList
