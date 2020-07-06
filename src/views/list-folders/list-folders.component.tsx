import React, {Component, HTMLAttributes} from 'react';
import VisualizationFoldersComponent from "../../commons/folders/visualization-folders/visualization-folders.component";
import {connect} from "react-redux";
interface IListFoldersProps {
    createFolder: any,
    addImage: any
}
class ListFoldersComponent extends Component<IListFoldersProps> {
    componentDidMount() {
        const context = document.getElementById('right-context')
        if (context) {
            context.addEventListener("click", (e: any) => {
                if(e.target.title === "Add Image" || e.target.textContent === "Add Image") {
                    this.props.addImage()
                } else if (e.target.textContent === "Create Folder" || e.target.title === "Create Folder") {
                    this.props.createFolder()
                }
            })
        }
    }

    render() {
        return (
            <div>
                <div className="root-folder">
                    <VisualizationFoldersComponent />
                </div>
            </div>
        );
    }
}
function mapStateToProps(state: any) {
    return {};
}
function mapDispatchToProps(dispatch: any) {
    return  {
        createFolder: () => dispatch({type: 'CREATE_FOLDER', value: {createFolder: true}}),
        addImage: () => dispatch({type: 'ADD_IMAGE', value: {addImage: true}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListFoldersComponent);
