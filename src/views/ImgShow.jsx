import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaperWrapper from '../components/PageWrapper';
import {getImages} from '../state/images';
import ImagesList from '../components/ImagesList/ImagesList';
import {Alert} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import ImgSingle from './ImgSingle';

const styles = {
    div: {
        width: '60%',
        margin: '10px auto',
    }
}
export class ImgShow extends Component {
    
    getData = () => {
        this.props._getImages();
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        // console.log(this.props);
        if(this.props._isError) {
            return (
                <PaperWrapper title='ImgShow'>
                    <div style={styles.div}>
                        <Alert variant='danger' transition='Fade'>Nie pobrano danych
                        <hr/>
                        <Alert.Link onClick={this.getData}>Try again</Alert.Link>
                        </Alert>
                        {/* <div onClick={this.getData}>Try again - refresh the page</div>                          */}
                    </div>
                   </PaperWrapper> 
        )} 

        if(this.props._images.length === 0) {
            return (
                <PaperWrapper title='ImgShow'>
                    <div style={styles.div}>
                        <Alert variant='success'>No data...
                        <hr/>
                        <Alert.Link onClick={this.getData} style={{textDecoration: 'underline'}}>Try again</Alert.Link>
                        </Alert>
                    </div>
                   </PaperWrapper> 
        )} 
        
        if(this.props.match.params.id) {
            // console.log(this.props.match.params.id);
            const idParam = this.props.match.params.id;
            const findImg = this.props._images.find(item => item.id === idParam)
            return <ImgSingle 
                    data={findImg} 
                    id={idParam} 
                    back={() => this.props.history.push('/img-show')}
                />
        }

        return (
            <PaperWrapper title='ImgShow'>
                <ImagesList 
                    data={this.props._images} 
                    changeRoute={this.props.history.push}
                /> 
            </PaperWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    _images: state.images.images,
    _isError: state.images.isError,
})

const mapDispatchToProps = ({
    _getImages: getImages,
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ImgShow))
