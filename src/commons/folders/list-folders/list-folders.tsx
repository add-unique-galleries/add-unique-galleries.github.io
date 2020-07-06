import React, {Component} from 'react';
import ListImages from "../list-images/list-images";

interface IListFoldersProps {
    folders: Array<any>,
    openFolder: any,
    addIdOnFolderForTiger: any
}
interface IFile {
    id: number,
    label: string,
    src: string
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
                return (<li key={index}>
                    <a onContextMenu={this.props.addIdOnFolderForTiger} onClick={() => this.props.openFolder(folder.id)}
                       className={folder.classTarget}>{folder.label}</a>
                    {folder.folders.length > 0 && folder.isOpen && this.treeView(folder.folders)}
                    {folder.isOpen && folder.files.map((file: IFile) => {
                        return <ListImages key={index} file={file} />
                    })}
                </li>)
            }) }
        </ul>)
    }
}

export default ListFolders;
