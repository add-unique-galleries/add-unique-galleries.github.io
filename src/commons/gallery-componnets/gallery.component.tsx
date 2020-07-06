import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchGalleryComponent from "./serch-gallery/search-gallery.component";
import GalleryService from "../../services/gallery/gallery.service";
import ListGalleryComponent from "./list-gallery/list-gallery.component";
import {IPhotosPixels} from "../../models/gallery.interfaces";

import './gallery.component.scss'

function mapStateToProps(state: any) {
    return {};
}
interface IGalleryState {
    galleryItems: Array<IPhotosPixels>
}

class GalleryComponent extends Component<{}, IGalleryState> {

    constructor(props: {}) {
        super(props);
        this.state = {galleryItems: []}
    }
    render() {
        return (
            <div className={'gallery-items'}>
                <SearchGalleryComponent  searchItemOnPexelGalleryEvent={this.searchItemOnPexelGalleryEvent} />
                <ListGalleryComponent photos={this.state.galleryItems}/>
            </div>
        );
    }

    private searchItemOnPexelGalleryEvent = (searchText: string) => {
        GalleryService.searchOnGallery(searchText).then(res => res.json()).then((data: {photos: Array<IPhotosPixels>}) => {
            this.setState({galleryItems: data.photos})
        })
    }
}

export default connect(mapStateToProps,)(GalleryComponent);
