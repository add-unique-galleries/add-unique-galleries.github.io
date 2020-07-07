import React, {Component} from 'react';

import './list-image.scss'
import {connect} from "react-redux";
import {IPhotos} from "../../../models/gallery.interfaces";
import {IMAGE_VIEW_OPEN, OPEN_CAROUSEL} from "../../../redux/actions/types";
interface IListImagesProps {
    file: IPhotos,
    files: Array<IPhotos>,
    openImage: any,
    addAllImagesOnFolder: any
}
class ListImages extends Component<IListImagesProps> {
    render() {
        const {file, files} = this.props
        return (
                <a className={'image-list'} onClick={() => this.openImage(file, files)}><img src={file.src} alt={file.label}/>{file.label}</a>
        );
    }

    private openImage(file: IPhotos, files: Array<IPhotos>) {
        this.props.openImage(file)
        this.props.addAllImagesOnFolder(files)
    }
}
function mapStateToProps(state: any) {
    return {};
}
function mapDispatchToProps(dispatch: any) {
    return  {
        openImage: (src: IPhotos) => dispatch({type: IMAGE_VIEW_OPEN, value: src}),
        addAllImagesOnFolder: (files: Array<IPhotos>) => dispatch({type: OPEN_CAROUSEL, value: files})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListImages);
