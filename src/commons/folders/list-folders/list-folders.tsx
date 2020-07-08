import React, {Component} from 'react';
import ListImages from "../list-images/list-images";

import './list-folder-images.component.scss'

interface IListFoldersProps {
    folders: Array<any>,
    openFolder: any,
    addIdOnFolderForTiger: any
    addMoreItems: any
    dragStart: any
    dragEnd: any
    dragEnter: any
    dragLeave: any
}

class ListFolders extends Component<IListFoldersProps> {


    render() {
        const {folders} = this.props
        return (
            this.treeView(folders)
        );
    }

    /**
     * Render folders on current open folder and files
     * @param folders
     */
    private treeView(folders: Array<any>) {
        return (<ul draggable={"true"}
                    onDragStart={this.props.dragStart}
                    onDragEnd={this.props.dragEnd}
                    onDragEnter={this.props.dragEnter}
                    onDragLeave={this.props.dragLeave}>
            {folders.map((folder, index) => {
                return (<li id={'parent-' + index} key={Math.random()} >
                    <a className={folder.classTarget} onContextMenu={this.props.addIdOnFolderForTiger} onClick={() => this.props.openFolder(folder.id)}
                       draggable={"true"}>{folder.label}</a>
                    {folder.folders.length > 0 && folder.isOpen && this.treeView(folder.folders)}
                    {folder.isOpen &&  <ListImages files={folder.files}/>}
                </li>)

            }) }
        </ul>)
    }


}

export default ListFolders;
