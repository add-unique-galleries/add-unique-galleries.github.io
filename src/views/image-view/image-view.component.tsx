import React, {Component} from 'react';
import {connect} from 'react-redux';
import {IPhotos} from "../../models/gallery.interfaces";

import './image-view.component.scss'
import CarouselGalleryComponent from "../../commons/gallery-componnets/carousel-gallery/carousel-gallery.component";
import { IMAGE_VIEW_OPEN} from "../../redux/actions/types";
import {imageViewInitState} from "../../redux/states/image-view.state";

interface IImageViewProps {
    selectedImage: IPhotos,
    arrCurrentFolderPictures: Array<IPhotos>,
    currentImageOnCarousel: any,
    closeCarousel: any
}


class ImageViewComponent extends Component<IImageViewProps> {


    render() {
        const {selectedImage, arrCurrentFolderPictures} = this.props
        return (
            <div>
                {selectedImage.src &&
                <div className={`carousel${selectedImage.src ? ' open' : ''}`}>
                    <a className="tag-remove" onClick={this.closeImage.bind(this)}>X</a>
                    <div className="content-carousel">
                        {arrCurrentFolderPictures[0].src && <CarouselGalleryComponent
                            selectedImageId={selectedImage.id}
                            imageGallery={arrCurrentFolderPictures}
                            previousImage={this.previousImage.bind(this)}
                            nextImage={this.nextImage.bind(this)}/>}
                    </div>
                </div>}
            </div>
        );
    }

    private previousImage(e: any) {
        e.preventDefault()
        const {selectedImage, arrCurrentFolderPictures, currentImageOnCarousel} = this.props
        const currentIndex = arrCurrentFolderPictures.findIndex(img => img.id === selectedImage.id)
        currentImageOnCarousel(arrCurrentFolderPictures[currentIndex - 1 >= 0 ? currentIndex - 1 : arrCurrentFolderPictures.length - 1])

    }

    private nextImage(e: any) {
        e.preventDefault()
        const {selectedImage, arrCurrentFolderPictures, currentImageOnCarousel} = this.props
        const currentIndex = arrCurrentFolderPictures.findIndex(img => img.id === selectedImage.id)
        currentImageOnCarousel(
        (        arrCurrentFolderPictures[currentIndex + 1 < arrCurrentFolderPictures.length
                    ? currentIndex + 1 : 0]
        ))

    }

    private closeImage() {
        this.props.closeCarousel(imageViewInitState)
    }
}

function mapStateToProps(state: any) {
    return {
        selectedImage: state.imageViewRedux,
        arrCurrentFolderPictures: state.carouselRedux
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        currentImageOnCarousel: (src: IPhotos) => dispatch({type: IMAGE_VIEW_OPEN, value: src}),
        closeCarousel: (src: IPhotos) => dispatch({type: IMAGE_VIEW_OPEN, value: src})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageViewComponent);
