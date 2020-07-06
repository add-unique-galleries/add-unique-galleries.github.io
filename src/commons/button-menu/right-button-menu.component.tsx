import React, {Component} from 'react';

// @ts-ignore
import folderIcon from './../../../public/assets/images/icons8-folder.svg';
// @ts-ignore
import pic from './../../../public/assets/images/picture.svg';
import './right-button-menu.component.scss'

interface IRightButtonMenuComponentState {
    visible: boolean,
    x: number,
    y: number
}

class RightButtonMenuComponent extends Component<{}, IRightButtonMenuComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            x: 0,
            y: 0
        };
        this.showContextMenu = this.showContextMenu.bind(this)
        this.hideContextMenu = this.hideContextMenu.bind(this)
    }

    render() {
        return (
            <div id={'right-context'} onContextMenu={this.showContextMenu} onClick={this.hideContextMenu}>
                {this.state.visible ? <div className="context" style={{left: `${this.state.x}px`, top: `${this.state.y}px`}}>
                    <ul>
                        {this.menuRender()}
                    </ul>
                </div> : null}
            </div>
        );
    }
    showContextMenu(e: any) {
        const clintX = e.clientX
        const clintY = e.clientY
        this.setState({visible: true, x: clintX, y: clintY})
    }

    hideContextMenu() {
        this.setState({visible: false, x: 0, y: 0})
    }
    private menuRender () {
        const menu = [{label: 'Create Folder', imgSrc: folderIcon}, {label: 'Add Image', imgSrc: pic}]
        return menu.map((m, i) => {
            return <li key={i} className={'context-item'}><img src={m.imgSrc} alt="icon" title={m.label}/>{m.label}</li>
        })
    }
}

export default RightButtonMenuComponent;
