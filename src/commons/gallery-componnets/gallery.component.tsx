import React, {Component} from 'react';
import SearchGalleryComponent from "./serch-gallery/search-gallery.component";
import GalleryService from "../../services/gallery/gallery.service";
import ListGalleryComponent from "./list-gallery/list-gallery.component";
import {IPhotos, IPhotosPixels} from "../../models/gallery.interfaces";

import './gallery.component.scss'

interface IGalleryProps {
    returnImg: any
}
interface IGalleryState {
    galleryItems: Array<IPhotosPixels>,
    selectedImages: Array<IPhotos>
}

class GalleryComponent extends Component<IGalleryProps, IGalleryState> {

    constructor(props: IGalleryProps) {
        super(props);
        this.state = {
            galleryItems: [],
            selectedImages: []
        }
    }

    render() {
        const {returnImg} = this.props
        return (
            <div className="gallery">
                <div className={'gallery-items'}>
                    <SearchGalleryComponent
                        searchItemOnPexelGalleryEvent={this.searchItemOnPexelGalleryEvent.bind(this)}/>
                    <ListGalleryComponent photos={this.state.galleryItems}
                                          selectImage={this.selectImagesOnGallery.bind(this)}/>

                </div>
                <div className={'add-images'}>
                    {this.state.selectedImages.length > 0 && (this.state.selectedImages.map((si, i) => (
                            <div className={'gallery-item-3'} key={i}>
                                <div className="header">
                                    <img src={si.src} alt={si.photographer}/>
                                    <a className="tag-remove" onClick={this.deleteOnListSelected.bind(this, si.id)}>X</a>
                                </div>
                                <div>
                                    <input type="text" placeholder={'Add name on picture'}
                                           onChange={this.addPictureName.bind(this, si.id)}/>
                                    <button type={"button"}
                                            onClick={() => {
                                                returnImg(this.state.selectedImages.filter(img => img.id === si.id)[0], this.state.selectedImages.length);
                                                this.deleteOnListSelected(si.id)
                                            }}
                                    >Add Picture
                                    </button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>

        );
    }

    /**
     * Search on Pexels
     * @param searchText
     */
    private searchItemOnPexelGalleryEvent = (searchText: string) => {
        GalleryService.searchOnGallery(searchText).then(res => res.json()).then((data: { photos: Array<IPhotosPixels> }) => {
            this.setState({galleryItems: data.photos})
        })
    }

    /**
     * Select images on gallery
     * @param file
     */
    private selectImagesOnGallery(file: IPhotos) {
        this.state.selectedImages.push({...file})
        this.setState({selectedImages: this.state.selectedImages})

    }

    /**
     * Add current picture name
     * @param id
     * @param e
     */
    private addPictureName(id: number, e: any) {
        this.state.selectedImages.filter(img => img.id === id)[0].label = e.target.value
        this.setState({selectedImages: this.state.selectedImages})
    }

    /**
     * Delete Picture by id
     * @param id
     */
    private deleteOnListSelected(id: number) {
        this.setState({selectedImages: this.state.selectedImages.filter(img => img.id !== id)})
    }
}

export default GalleryComponent;
