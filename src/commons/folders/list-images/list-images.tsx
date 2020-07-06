import React, {Component} from 'react';

import './list-image.scss'
import {connect} from "react-redux";
interface IListImagesProps {
    file: IFile,
    openImage: any
}
interface IFile {
    id: number,
    label: string,
    src: string
}
class ListImages extends Component<IListImagesProps> {
    render() {
        const {file} = this.props
        return (
                <a className={'image-list'} onClick={() => this.openImage(file)}><img src={file.src} alt={file.label}/>{file.label}</a>
        );
    }

    private openImage(file: IFile) {
        this.props.openImage(file)
    }
}
function mapStateToProps(state: any) {
    return {};
}
function mapDispatchToProps(dispatch: any) {
    return  {
        openImage: (src: IFile) => dispatch({type: 'IMAGE_VIEW_OPEN', value: src})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListImages);
