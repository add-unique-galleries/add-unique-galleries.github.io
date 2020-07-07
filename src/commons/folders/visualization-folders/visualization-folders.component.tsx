import React, {Component, ReactDOM} from 'react';
import ReactDom from 'react-dom'

import './list-folders.component.scss'
import RightButtonMenuComponent from "../../button-menu/right-button-menu.component";
import CreateFolderComponent from "../create-folder/create-folder.component";
import ListFolders from "../list-folders/list-folders";
import {connect} from "react-redux";
import GalleryComponent from "../../gallery-componnets/gallery.component";
import {IPhotos} from "../../../models/gallery.interfaces";
import ListImages from "../list-images/list-images";

interface IVisualizationFoldersProps {
    createFolder: boolean,
    addImage: boolean,
    closeFolder: any,
    closeImage: any
}

interface IVisualizationFoldersState {
    isOpen: boolean,
    classTarget: string,
    folders: Array<any>
    files: Array<IPhotos>

}

class VisualizationFoldersComponent extends Component<IVisualizationFoldersProps, IVisualizationFoldersState> {
    get items(): number {
        return this._items;
    }

    set items(value: number) {
        this._items = value;
    }
    private readonly refContextMenu: React.RefObject<RightButtonMenuComponent>;
    private _items: number = 0;

    constructor(props: IVisualizationFoldersProps) {
        super(props);
        this.state = {
            isOpen: false,
            classTarget: 'folder-0',
            folders: [],
            files: []
        }
        this.addMoreItems = this.addMoreItems.bind(this)
        this.openFolder = this.openFolder.bind(this)
        this.addIdOnFolderForTiger = this.addIdOnFolderForTiger.bind(this)
        this.refContextMenu = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("click", () => {
            this.refContextMenu.current?.hideContextMenu()
        })
    }


    render() {
        return (
            <div>
                <RightButtonMenuComponent ref={this.refContextMenu}/>
                <ul className="tree-view-folders">
                    <li id={'parent-root'}>
                        <a onContextMenu={this.addIdOnFolderForTiger} onClick={this.openFolder.bind(this, 0)}
                           className={this.state.classTarget}>root</a>

                        {this.state.isOpen && <ListFolders folders={this.state.folders} openFolder={this.openFolder}
                                                           addIdOnFolderForTiger={this.addIdOnFolderForTiger}
                                                           addMoreItems={this.addMoreItems}/>}
                        {
                            this.state.isOpen &&
                            this.state.files.map((file: IPhotos, index) => {
                                return <ListImages key={index} file={file} files={this.state.files}/>
                            })
                        }

                    </li>
                    {this.props.createFolder && <CreateFolderComponent label={this.addMoreItems}/>}
                    {this.props.addImage && <GalleryComponent returnImg={this.addImgOnCurrentDir.bind(this)}/>}
                </ul>
            </div>
        );
    }

    /**
     * Add Files On State
     * @param file
     * @param itemsEnd
     */
    private addImgOnCurrentDir(file: IPhotos, itemsEnd: number) {
        if(this.checkIsIdExist(file.id, this.state.folders)) {
            return
        }
        this.getCurrentFolderAndAddItems('', 'file', file)
        if (itemsEnd) {
            this.props.closeImage()
        }
    }

    /**
     * Search is exist picture
     * @param search
     * @param arr
     */
    private checkIsIdExist(search: number, arr: Array<any>) {
        let isExist = false
        arr.map((item) => {
            if(isExist) {
                return
            }
            return item.files.map((file: IPhotos) => {
                if(file.id === search){
                    isExist = true
                }
            })
            if (item.folders) return this.checkIsIdExist(search, item.folders);
        });
        return isExist
    }

    /**
     * Open Folder by class name
     * @param index
     */
    private openFolder(index: number) {

        if (index === 0) {
            this.setState({
                isOpen: !this.state.isOpen,
                classTarget:
                    (!this.state.isOpen ?
                        `${this.state.classTarget} open` :
                        this.state.classTarget.split(' ')[0])
            })
        } else {
            let itemsState = [...this.state.folders]
            const itemState = this.updateIsOpen(index, itemsState)
            this.setState({folders: itemState})
        }
    }

    /**
     * Add Folder on current folder
     * @param search
     * @param arr
     * @param label
     */
    private addFolderWithNameAndParams(search: string | undefined, arr: Array<any>, label: string): any {
            arr.map((item) => {
                if (item.classTarget === search) {
                    const customId = this.lengthItems(arr) + 1
                    item.folders.push({
                        id: customId,
                        label: label,
                        classTarget: `folder-${customId}`,
                        isOpen: false,
                        folders: [],
                        files: []
                    })
                }
                if (item.folders) return this.addFolderWithNameAndParams(search, item.folders, label);
            });
            return arr
    }

    /**
     * Check for unique id for folder
     * @param arr
     */
    private lengthItems(arr: Array<any>) {
        arr.map(a => {
            this._items++
            if (a.folders) return this.lengthItems(a.folders)
        })
        return this._items
    }

    /**
     * Update state open folder
     * @param id
     * @param arr
     */
    private updateIsOpen(id: number, arr: Array<any>): any {
        arr.map((item) => {
            if (item.id === id) {
                item.isOpen = !item.isOpen
                item.classTarget = (item.isOpen ?
                    `${item.classTarget} open` :
                    item.classTarget.split(' ')[0])
            }
            if (item.folders) return this.updateIsOpen(id, item.folders);
        });
        return arr
    }

    /**
     * Click event listener for add folder
     * @param folderName
     */
    private addMoreItems(folderName: string) {
        if(!folderName.length) {
            return
        }
        this.getCurrentFolderAndAddItems(folderName, 'folder')

        this.props.closeFolder()
    }

    /**
     * Get current folder and add items
     * @param folderName
     * @param file
     * @param target
     */
    private getCurrentFolderAndAddItems(folderName: string, target: string, file?: IPhotos) {
        const searchElement =
            document.getElementById('add-event')?.children[0].className
        if(target === 'folder') {
            if(searchElement === 'folder-0') {
                const customId = this.lengthItems(this.state.folders) + 1
                this.state.folders.push({
                    id: customId,
                    label: folderName,
                    classTarget: `folder-${customId}`,
                    isOpen: false,
                    folders: [],
                    files: []
                })
                this.setState({folders: this.state.folders})
            } else {
                this.setState({folders: this.addFolderWithNameAndParams(searchElement,
                    this.state.folders,
                    folderName)})
            }
        } else {
            if(searchElement === 'folder-0') {
                // @ts-ignore
                this.state.files.push(file)

                this.setState({files: this.state.files})
            } else {
                this.setState({folders: this.addFilesWithParams(searchElement, this.state.folders, file)})
            }
        }
    }
    /**
     * Check current folder context open
     * @param e
     */
    private addIdOnFolderForTiger(e: any) {
        e.preventDefault();
        const prevElm = document.getElementById('add-event')

        if (prevElm) {
            prevElm.id = ''
        }
        e.target.parentElement.id = 'add-event'
        this.refContextMenu.current?.showContextMenu(e)
    }

    /**
     * Add File on current dir
     * @param search
     * @param folders
     * @param file
     */
    private addFilesWithParams(search: string | undefined, folders: Array<any>, file: IPhotos | undefined) {
        folders.map((item) => {
            if (item.classTarget === search) {
                item.files.push(file)
            }
            if (item.folders) return this.addFilesWithParams(search, item.folders, file);
        });
        return folders
    }
}

function mapStateToProps(state: any) {
    return {
        addImage: state.documentRedux.addImage,
        createFolder: state.documentRedux.createFolder
    };
}
function mapDispatchToProps(dispatch: any) {
    return  {
        closeFolder: () => dispatch({type: 'CREATE_FOLDER', value: {createFolder: false}}),
        closeImage: () => dispatch({type: 'CREATE_FOLDER', value: {addImage: false}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VisualizationFoldersComponent);
