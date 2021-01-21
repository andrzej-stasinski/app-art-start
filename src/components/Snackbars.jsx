import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

export const Snackbars = props => {

    const bars = [
        {text: 'message one', color: 'success', key: 1},
        {text: 'message two', color: 'danger', key: 2},
    ];

    // console.log(props._bars)

    return (
        <div>
            
            {
            props._bars.map((bar, index) => (
                <div key={bar.key}
                    style={{
                        width: 260,
                        marginLeft: 50,
                        position: 'fixed',
                        bottom: 45 + index * 70,
                    }} 
                    >
                    <Alert variant={bar.color}>{bar.text}</Alert>
                </div>                
            ))
            }             
        </div>
    )
}

const mapStateToProps = (state) => ({
    _bars: state.snackbars.bars,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Snackbars)
