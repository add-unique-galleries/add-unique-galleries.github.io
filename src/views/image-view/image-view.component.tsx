import React, {Component} from 'react';
import {connect} from 'react-redux';
import {IPhotos} from "../../models/gallery.interfaces";

import './image-view.component.scss'

interface IImageViewProps {
    selectedImage: any,
    arrCurrentFolderPictures: Array<IPhotos>
}

interface IImageViewState {
    currentPicture: IPhotos | undefined,
    picturesOnFolder: Array<IPhotos>,

}

class ImageViewComponent extends Component<IImageViewProps, IImageViewState> {
    constructor(props: IImageViewProps) {
        super(props);
        this.state = {
            currentPicture: undefined,
            picturesOnFolder: []
        }
    }

    componentWillUpdate(nextProps: Readonly<IImageViewProps>, nextState: Readonly<IImageViewState>, nextContext: any) {
        if (this.props.selectedImage !== nextProps.selectedImage) {
            const {selectedImage, arrCurrentFolderPictures} = nextProps
            console.log(nextProps)
            this.setState({
                currentPicture: selectedImage,
                picturesOnFolder: arrCurrentFolderPictures.length > 0 ? arrCurrentFolderPictures : []
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.currentPicture?.src &&
                <div className={`carousel${this.state.currentPicture?.src ? ' open' : ''}`}>
                    <a className="tag-remove" onClick={this.closeImage.bind(this)}>X</a>
                    <div className="content-carousel">
                        <img src={this.state.currentPicture?.src} alt={this.state.currentPicture?.label} />
                    </div>
                </div>}
            </div>
        );
    }

    private closeImage() {
        this.setState({currentPicture: undefined})
    }
}

function mapStateToProps(state: any) {
    return {
        selectedImage: state.imageViewRedux,
        arrCurrentFolderPictures: state.carouselRedux
    };
}

export default connect(
    mapStateToProps,
)(ImageViewComponent);
