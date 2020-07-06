import React, {Component} from 'react';
import {connect} from 'react-redux';

interface IImageViewProps {
    selectedImage: any
}

class ImageViewComponent extends Component<IImageViewProps> {
    render() {
        return (
            <div>
                {this.props.selectedImage.src && <img src={this.props.selectedImage.src} alt={this.props.selectedImage.label}/>}
            </div>
        );
    }
}
function mapStateToProps(state: any) {
    return {
        selectedImage: state.imageViewRedux
    };
}
export default connect(
    mapStateToProps,
)(ImageViewComponent);
