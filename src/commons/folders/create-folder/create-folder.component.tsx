import React, {Component} from 'react';

interface ICreateFolderProps {
    label: any
}

interface ICreateFolderState {
    folderName: string
}

class CreateFolderComponent extends Component<ICreateFolderProps, ICreateFolderState> {
    constructor(props: ICreateFolderProps) {
        super(props);
        this.state = {folderName: ""}
    }

    render() {
        const {label} = this.props
        return (
            <li>
                <input type="text" onChange={this.changeValue.bind(this)}/>
                <button type={"button"} onClick={() => label(this.state.folderName)}>Add</button>
            </li>
        );
    }

    private changeValue(e: any) {
        this.setState({folderName: e.target.value})
    }
}

export default CreateFolderComponent;
