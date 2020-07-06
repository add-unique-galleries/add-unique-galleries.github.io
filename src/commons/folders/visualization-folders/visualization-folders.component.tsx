import React, {Component} from 'react';

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
    private readonly refContextMenu: React.RefObject<RightButtonMenuComponent>;

    constructor(props: {}) {
        super(props);
        this.state = {
            isOpen: false,
            classTarget: 'folder',
            folders: [
                {
                    id: 1,
                    label: 'first',
                    classTarget: 'folder',
                    isOpen: false,
                    folders: [{
                        id: 3,
                        label: 'tree',
                        classTarget: 'folder',
                        isOpen: false,
                        folders: [{
                            id: 4,
                            label: 'fore',
                            classTarget: 'folder',
                            isOpen: false,
                            folders: [],
                            files: []
                        }],
                        files: [{
                            id: 3885948,
                            label: 'cat',
                            src: "https://images.pexels.com/photos/3885948/pexels-photo-3885948.jpeg?auto=compress&cs=tinysrgb&h=350"
                        }]
                    }],
                    files: []
                }, {
                    id: 2,
                    label: 'sec',
                    classTarget: 'folder',
                    isOpen: false,
                    folders: [],
                    files: []
                }
            ],
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
                    <li>
                        <a onContextMenu={this.addIdOnFolderForTiger} onClick={this.openFolder.bind(this, 0)}
                           className={this.state.classTarget}>root</a>
                        {/*<CreateFolderComponent label={this.addMoreItems}/>*/}
                        {this.state.isOpen && <ListFolders folders={this.state.folders} openFolder={this.openFolder}
                                                           addIdOnFolderForTiger={this.addIdOnFolderForTiger}/>}
                    </li>
                </ul>
            </div>
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
        e.preventDefault();
        const prevElm = document.getElementById('add-event')

        if (prevElm) {
            prevElm.id = ''
        }
        e.target.id = 'add-event'
        this.refContextMenu.current?.showContextMenu(e)
    }
}

export default VisualizationFoldersComponent;
