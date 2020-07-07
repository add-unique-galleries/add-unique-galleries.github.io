import React, {Component} from 'react';
import {IPhotos} from "../../../models/gallery.interfaces";
import './carousel-gallery.component.scss';

interface ICarouselGalleryProps {
    selectedImageId: number,
    imageGallery: Array<IPhotos>,
    previousImage: any,
    nextImage: any,
}

class CarouselGalleryComponent extends Component<ICarouselGalleryProps> {

    render() {
        return (
            <div className={'container-gallery'}>
                <div id="gallery">
                    <a onClick={this.props.previousImage} className={'prev-btn'}>{"<"}</a>
                    <a onClick={this.props.nextImage} className={'next-btn'}>{">"}</a>
                    {this.loadImages()}

                </div>
            </div>
        );
    }

    private loadImages() {
        return this.props.imageGallery.map((img, i) => {
            if (this.props.selectedImageId === img.id) {
                return (<img src={img.src} alt={img.photographer} key={i} />)
            }
        })
    }
}

export default CarouselGalleryComponent;
