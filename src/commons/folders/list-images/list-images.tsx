import React, {Component} from 'react';

import './list-image.scss'
import {connect} from "react-redux";
import {IPhotos} from "../../../models/gallery.interfaces";
import {IMAGE_VIEW_OPEN, OPEN_CAROUSEL} from "../../../redux/actions/types";

interface IListImagesProps {
    files: Array<IPhotos>,
    openImage: any,
    addAllImagesOnFolder: any
}

class ListImages extends Component<IListImagesProps> {
    render() {
        const {files} = this.props
        return (
            this.props.files.map((file: IPhotos, index) => {
                return <div key={Math.random()} className={'image-container'} draggable={"true"}><a
                    className={'image-list'}
                    onClick={() => this.openImage(file, files)}>
                    <img src={file.src} alt={file.label}/><span>{file.label}</span>
                </a>
                </div>
            })
        );
    }

    /**
     * Add current file and other files on gallery reducer to open gallery
     * @param file
     * @param files
     */
    private openImage(file: IPhotos, files: Array<IPhotos>) {
        this.props.openImage(file)
        this.props.addAllImagesOnFolder(files)
    }
}

function mapStateToProps(state: any) {
    return {};
}

function mapDispatchToProps(dispatch: any) {
    return {
        openImage: (src: IPhotos) => dispatch({type: IMAGE_VIEW_OPEN, value: src}),
        addAllImagesOnFolder: (files: Array<IPhotos>) => dispatch({type: OPEN_CAROUSEL, value: files})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListImages);
