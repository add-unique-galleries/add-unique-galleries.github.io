import React, {Component} from 'react';
import ListImages from "../list-images/list-images";
import CreateFolderComponent from "../create-folder/create-folder.component";
import {IPhotos} from "../../../models/gallery.interfaces";

interface IListFoldersProps {
    folders: Array<any>,
    openFolder: any,
    addIdOnFolderForTiger: any
    addMoreItems: any
}

class ListFolders extends Component<IListFoldersProps> {


    render() {
        const {folders} = this.props
        return (
            this.treeView(folders)
        );
    }

    private treeView(folders: Array<any>) {
        return (<ul>
            {folders.map((folder, index) => {
                return (<li id={'parent-' + index} key={index} >
                    <a className={folder.classTarget} onContextMenu={this.props.addIdOnFolderForTiger} onClick={() => this.props.openFolder(folder.id)}
                       >{folder.label}</a>
                    {folder.folders.length > 0 && folder.isOpen && this.treeView(folder.folders)}
                    {folder.isOpen && folder.files.map((file: IPhotos) => {
                        return <ListImages key={index} file={file} />
                    })}
                </li>)

            }) }
        </ul>)
    }
}

export default ListFolders;
