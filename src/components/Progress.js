
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

const styles = {
    div: {
        position: 'fixed',
        left: 0, top: 0,
        width: '100vw', height: '100vh',
        zIndex: 10,
        backgroundColor: 'rgba(30,30,30,0.8)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
    }
}
export const Progress = props => {
    // console.log(props)
    return (
        props._spinner.length > 0
        ?
        <div style={styles.div}>
            <Spinner animation="border" variant='warning' style={{fontSize: 'x-large'}} >
            <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
        : null
    )
}

const mapStateToProps = (state) => ({
    _spinner: state.progress.spinner,
})

const mapDispatchToProps = ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Progress)

