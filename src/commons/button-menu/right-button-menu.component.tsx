import React, {Component} from 'react';
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
    }

    render() {
        return (
            <div className={'right-context'} onContextMenu={this.showContextMenu.bind(this)} onClick={this.hideContextMenu.bind(this)}>
                {this.state.visible ? <div className="context" style={{left: `${this.state.x}px`, top: `${this.state.y}px`}}>
                    <ul>
                        {this.menuRender()}
                    </ul>
                </div> : null}
                {this.props.children}
            </div>
        );
    }
    private showContextMenu(e: any) {
        e.preventDefault();
        const clintX = e.clientX
        const clintY = e.clientY
        this.setState({visible: true, x: clintX, y: clintY})
    }

    private hideContextMenu(e: any) {
        e.preventDefault()
        this.setState({visible: false, x: 0, y: 0})
    }
    private menuRender () {
        const menu = [{label: 'Create Folder'}, {label: 'Add Image'}]
        return menu.map((m, i) => {
            return <li key={i} className={'context-item'}>{m.label}</li>
        })
    }
}

export default RightButtonMenuComponent;
