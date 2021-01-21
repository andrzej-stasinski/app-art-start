import React from 'react';
import PageWrapper from '../components/PageWrapper';
import {Button, Container} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addSnack} from '../state/snackbars';

const Snack = (props) => {
    console.log(props.bars);

    const handleAddSnack1 = () => {
        props._addSnack('Ala ma kota', 'success');
    }

    const handleAddSnack2 = () => {
        props._addSnack('Ola ma pas', 'danger');
    }
    return (
        <PageWrapper title='Snack'>
            <Container>
                <Button onClick={handleAddSnack1} variant='success'>Add snackbar - success</Button>
                {' '}
                <Button onClick={handleAddSnack2} variant='danger'>Add snackbar - danger</Button>
            </Container>
        </PageWrapper>
    )
}
const mapStateToProps = state => ({
    bars: state.snackbars.bars,
})
const mapDispatchToProps = ({
    _addSnack: addSnack
})
export default connect(mapStateToProps, mapDispatchToProps)(Snack)
