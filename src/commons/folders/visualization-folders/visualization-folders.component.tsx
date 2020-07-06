import React, {Component} from 'react';
// @ts-ignore
import folderIcon from '../../../../public/assets/images/icons8-folder.svg';
// @ts-ignore
import openFolderIcon from '../../../../public/assets/images/icons8-opened-folder.svg';

import './list-folders.component.scss'
import RightButtonMenuComponent from "../../button-menu/right-button-menu.component";
import CreateFolderComponent from "../create-folder/create-folder.component";
import ListFolders from "../list-folders/list-folders";

interface IVisualizationFoldersState {
    isOpen: boolean,
    classTarget: string,
    folders: Array<any>
    files: Array<string>
}

class VisualizationFoldersComponent extends Component<{}, IVisualizationFoldersState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isOpen: false,
            classTarget: 'folder-root',
            folders: [
                {
                    id: 1,
                    label: 'first',
                    classTarget: 'folder-1',
                    isOpen: false,
                    folders: [{
                        id: 3,
                        label: 'tree',
                        classTarget: 'folder-1-3',
                        isOpen: false,
                        folders: [{
                            id: 4,
                            label: 'fore',
                            classTarget: 'folder-1-3',
                            isOpen: false,
                            folders: [],
                            files: []
                        }],
                        files: []
                    }],
                    files: []
                }, {
                    id: 2,
                    label: 'sec',
                    classTarget: 'folder-2',
                    isOpen: false,
                    folders: [],
                    files: []
                }
            ],
            files: []
        }
        this.addMoreItems = this.addMoreItems.bind(this)
        this.openFolder = this.openFolder.bind(this)
    }

    render() {
        return (
            <RightButtonMenuComponent>
                <ul className="sitemap">
                    <li>
                        <a onContextMenu={this.addIdOnFolderForTiger} onClick={this.openFolder.bind(this, 0)}
                           className={this.state.classTarget}>root</a>
                        {/*<CreateFolderComponent label={this.addMoreItems}/>*/}
                        {this.state.isOpen && <ListFolders folders={this.state.folders} openFolder={this.openFolder} addIdOnFolderForTiger={this.addIdOnFolderForTiger}/>}
                    </li>
                </ul>
            </RightButtonMenuComponent>
        );
    }

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
            const itemState = this.findId(index, itemsState)
            this.setState({folders: itemState})
        }
    }

    private findId(id: number, arr: Array<any>): any {
        arr.map((item) => {
            if (item.id === id) {
                item.isOpen = !item.isOpen
                item.classTarget = (item.isOpen ?
                    `${item.classTarget} open` :
                    item.classTarget.split(' ')[0])
            }
            if (item.folders) return this.findId(id, item.folders);
        });
        return arr
    }

    private addMoreItems(e: any) {
        e.preventDefault();
        const childrenItems = [...this.state.folders]
        childrenItems.push({label: e.target.value, folders: []})
        this.setState({folders: childrenItems})
    }

    private addIdOnFolderForTiger(e: any) {
        const prevElm = document.getElementById('add-event')

        if (prevElm) {
            prevElm.id = ''
        }
        e.target.id = 'add-event'
    }
}

export default VisualizationFoldersComponent;
