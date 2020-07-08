import React, {Component} from 'react';
import {connect} from "react-redux";

import './list-folders.component.scss'
import RightButtonMenuComponent from "../../button-menu/right-button-menu.component";
import CreateFolderComponent from "../create-folder/create-folder.component";
import ListFolders from "../list-folders/list-folders";

import GalleryComponent from "../../gallery-componnets/gallery.component";
import {IPhotos} from "../../../models/gallery.interfaces";
import ListImages from "../list-images/list-images";
import {IFolderTreeModel} from "../../../models/folder-tree.model";
import {
    ADD_FOLDER,
    ADD_IMAGE,
    ADD_IMAGES,
    CREATE_FOLDER,
    REMOVE_IMAGE,
    UPDATE_FOLDER
} from "../../../redux/actions/types";

interface ICommonsFoldersProps {
    createFolder: boolean,
    addImage: boolean,
    treeView: IFolderTreeModel,
    closeFolderReducer: any,
    closeImageReducer: any,
    createFolderReducer: any,
    updateFolderReducer: any,
    addImageReducer: any,
    updateImageReducer: any,
}

interface ICommonsFoldersState {
    root: {
        id: number,
        label: string,
        isOpen: boolean,
        classTarget: string,
        folders: Array<IFolderTreeModel>
        files: Array<IPhotos>
    }
    searchElement: string | undefined,
    dragId: string
}

class CommonsFoldersComponent extends Component<ICommonsFoldersProps, ICommonsFoldersState> {
    get items(): number {
        return this._items;
    }

    set items(value: number) {
        this._items = value;
    }

    private readonly refContextMenu: React.RefObject<RightButtonMenuComponent>;
    private _items: number = 0;
    constructor(props: ICommonsFoldersProps) {
        super(props);
        this.state = {
            root: {
                classTarget: "",
                files: [],
                folders: [],
                id: 0,
                isOpen: false,
                label: ""
            },
            searchElement: '',
            dragId: ''
        }
        this.addMoreItems = this.addMoreItems.bind(this)
        this.openFolder = this.openFolder.bind(this)
        this.addIdOnFolderForTiger = this.addIdOnFolderForTiger.bind(this)
        this.dragFolderStart = this.dragFolderStart.bind(this)
        this.dragFolderEnd = this.dragFolderEnd.bind(this)
        this.dragFolderEnter = this.dragFolderEnter.bind(this)
        this.dragFolderLeave = this.dragFolderLeave.bind(this)
        this.refContextMenu = React.createRef();
    }

    componentDidMount() {
        this.setState({root: this.props.treeView})
        document.addEventListener("click", () => {
            this.refContextMenu.current?.hideContextMenu
        })
    }


    render() {
        return (
            <div>
                <RightButtonMenuComponent ref={this.refContextMenu}/>
                <ul className="tree-view-folders">
                    <li id={'parent-root'}>
                        <a onContextMenu={this.addIdOnFolderForTiger} onClick={this.openFolder.bind(this, 0)}
                           className={this.state.root.classTarget}
                           draggable={"false"}
                           onDragStart={event => {
                               event.preventDefault();
                               return false
                           }}
                           onDragEnd={this.dragFolderEnd}
                           onDragLeave={this.dragFolderLeave} onDragEnter={this.dragFolderEnter}
                        ><span>{this.state.root.label}</span></a>
                        {this.state.root.isOpen &&
                        <ListFolders folders={this.state.root.folders} openFolder={this.openFolder}
                                     addIdOnFolderForTiger={this.addIdOnFolderForTiger}
                                     addMoreItems={this.addMoreItems}
                                     dragEnd={this.dragFolderEnd} dragEnter={this.dragFolderEnter}
                                     dragLeave={this.dragFolderLeave} dragStart={this.dragFolderStart}/>}
                        {this.state.root.isOpen && <ListImages files={this.state.root.files}/>}

                    </li>
                    {this.props.createFolder && <CreateFolderComponent label={this.addMoreItems}/>}
                    {this.props.addImage && <GalleryComponent returnImg={this.addImgOnCurrentDir.bind(this)}
                                                              closeGallery={this.closeGallery.bind(this)}/>}
                </ul>
            </div>
        );
    }

    private closeGallery(e: any) {
        e.preventDefault()
        this.props.closeImageReducer()
    }

    /**
     * Add Files On State
     * @param file
     * @param itemsEnd
     */
    private addImgOnCurrentDir(file: IPhotos, itemsEnd: number) {
        if (this.checkIsIdExist(file.id, this.state.root.folders)) {
            return
        }
        const fileState = this.getCurrentFolderAndAddItems('', 'file', file)

        this.setState(fileState)
        this.props.addImageReducer(fileState)
        if (itemsEnd) {
            this.props.closeImageReducer()
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
            if (isExist) {
                return
            }
            return item.files.map((file: IPhotos) => {
                if (file.id === search) {
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

        let statusCopy = Object.assign({}, this.state);
        if (index === 0) {
            statusCopy.root.isOpen = !this.state.root.isOpen;
            statusCopy.root.classTarget = (this.state.root.isOpen ?
                `${this.state.root.classTarget} open` :
                this.state.root.classTarget.split(' ')[0])
            this.setState(statusCopy)

        } else {
            let itemsState = [...this.state.root.folders]
            const itemState = this.updateIsOpen(index, itemsState)
            statusCopy.root.folders = itemState
            this.setState(statusCopy)
        }
        this.props.updateFolderReducer(statusCopy.root)
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
                const customId = Number(Math.random().toString().split('.')[1])
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
     * Update state open folder
     * @param id
     * @param arr
     */
    private updateIsOpen(id: number, arr: Array<IFolderTreeModel>) {
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
        if (!folderName.length) {
            return
        }
        const folderState = this.getCurrentFolderAndAddItems(folderName, 'folder', {} as IPhotos)
        this.setState(folderState)
        this.props.createFolderReducer(folderState)
        this.props.closeFolderReducer()
    }

    /**
     * Get current folder and add items
     * @param folderName
     * @param file
     * @param target
     */
    private getCurrentFolderAndAddItems(folderName: string, target: string, file: IPhotos) {

        let statusCopy = Object.assign({}, this.state);
        if (target === 'folder') {

            if (this.state.searchElement && this.state.searchElement.split(' ')[0] === 'folder-0') {
                const generateId = Number(Math.random().toString().split('.')[1])
                statusCopy.root.folders.push({
                    id: generateId,
                    label: folderName,
                    classTarget: `folder-${generateId}`,
                    isOpen: false,
                    folders: [],
                    files: []
                })
            } else {
                statusCopy.root.folders = this.addFolderWithNameAndParams(this.state.searchElement,
                    this.state.root.folders,
                    folderName)

            }
        } else {
            if (this.state.searchElement && this.state.searchElement.split(' ')[0] === 'folder-0') {
                statusCopy.root.files.push(file)
            } else {
                statusCopy.root.folders = this.addFilesWithParams(this.state.searchElement, this.state.root.folders, file)

            }
        }
        return statusCopy
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
        this.setState({searchElement: document.getElementById('add-event')?.children[0].className})
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
            console.log(item.classTarget, search)
            if (item.folders) return this.addFilesWithParams(search, item.folders, file);
        });
        return folders
    }

    private dragFolderStart(e: any) {

        console.log(e.target.className, 'start')

        setTimeout(() => this.setState({dragId: e.target.className.split(' ')[0].split('-')[1]}), 0)
        // this.state.dragId =
    }

    private dragFolderEnd(e: any) {
        console.log(e.target, 'end')
        // this.setState({dragId:  e.target.className.split(' ')[0].split('-')[1]})
        // console.log(e.target, 'end' , this.state.dragId)
        setTimeout(() => {
            const currentFolderToDrop = this.state.root.folders.filter(function f(root): any {
                if (root.id === Number(e.target.className.split(' ')[0].split('-')[1])) return true
                if (root.folders.length) {
                    return root.folders = root.folders.filter(f)
                }
            })[0]
            const that = this
            const currentFolderDrag = this.state.root.folders.filter(function f(root): any {
                if (root.id === Number(that.state.dragId)) return true
                if (root.folders.length) {
                    return root.folders = root.folders.filter(f)
                }
            })[0]
            let statusCopy = Object.assign({}, this.state);
            statusCopy.root.folders = this.state.root.folders.filter(function f(root): any {
                if (root.id !== Number(that.state.dragId)) return true
                if (root.folders.length) {
                    return root.folders = root.folders.filter(f)
                }
            })
            console.log(currentFolderDrag)
            currentFolderToDrop.folders = currentFolderDrag.folders
            this.props.updateFolderReducer(statusCopy)
        }, 0)
    }


    /**
     * Add hover class when enter folder
     * @param e
     */
    private dragFolderEnter(e: any) {
        const classNames = e.target.className.split(' ')
        console.log(classNames[0].split('-'))
        if (classNames[0].split('-')[0] === 'folder') {
            if (!classNames.find((c: string) => c === 'hover'))
                e.target.className = e.target.className + ' hover'
        }
    }

    /**
     * Remove hover class when leave folder
     * @param e
     */
    private dragFolderLeave(e: any) {
        console.log(e.target.className)
        e.target.className = e.target.className.replace(' hover', '')
    }
}

function mapStateToProps(state: any) {
    console.log(state)
    return {
        addImage: state.documentRedux.addImage,
        createFolder: state.documentRedux.createFolder,
        treeView: state.fileStorageRedux
    };

}

function mapDispatchToProps(dispatch: any) {
    return {
        closeFolderReducer: () => dispatch({type: CREATE_FOLDER, value: {createFolder: false}}),
        closeImageReducer: () => dispatch({type: ADD_IMAGE, value: {addImage: false}}),
        createFolderReducer: (folders: IFolderTreeModel) => dispatch({type: ADD_FOLDER, value: folders}),
        updateFolderReducer: (folders: IFolderTreeModel) => dispatch({type: UPDATE_FOLDER, value: folders}),
        addImageReducer: (files: Array<IPhotos>) => dispatch({type: ADD_IMAGES, value: files}),
        updateImageReducer: (file: IPhotos) => dispatch({type: REMOVE_IMAGE, value: file}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonsFoldersComponent);
