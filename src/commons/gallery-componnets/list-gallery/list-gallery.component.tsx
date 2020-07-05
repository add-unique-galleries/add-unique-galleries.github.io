import React, {Component} from 'react';

import {IPhotosPixels} from "../../../models/gallery.interfaces";

import './list-gallery.component.scss'

interface IListGalleryProps {
    photos: Array<IPhotosPixels>
}

class ListGalleryComponent extends Component<IListGalleryProps> {

    renderImages() {
        const {photos} = this.props
        if (photos.length > 0) {
            return photos.map((p, i: number) => {
                return (<div key={i} className="render-3">
                    <a href={p.url}><img src={p.src.medium} alt={`Author photograph: ${p.photographer}`}/></a>
                </div>)
            })
        }
    }

    render() {
        return (
            <div className={'list-gallery'}>
                {this.renderImages()}
            </div>
        );
    }
}

export default ListGalleryComponent;
