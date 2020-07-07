import React, {Component} from 'react';

import {IPhotosPixels} from "../../../models/gallery.interfaces";

import './list-gallery.component.scss'

interface IListGalleryProps {
    photos: Array<IPhotosPixels>
    selectImage: any
}

class ListGalleryComponent extends Component<IListGalleryProps> {
    /**
     * Render Images on gallery choose
     */
    renderImages() {
        const {photos, selectImage} = this.props
        if (photos.length > 0) {
            return photos.map((p, i: number) => {
                return (<div key={i} className="render-3">
                    <a onClick={() => selectImage({src: p.src.medium, photographer: p.photographer, id: p.id})}>
                        <img src={p.src.medium} alt={`Author photograph: ${p.photographer}`}/></a>
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
