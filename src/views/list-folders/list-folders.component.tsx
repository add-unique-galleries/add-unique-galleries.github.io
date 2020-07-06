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
                if(e.target.title) {
                    this.props.addImage()
                } else if (e.target.textContent) {
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
        createFolder: () => dispatch({type: 'CREATE_FOLDER', value: true}),
        addImage: () => dispatch({type: 'ADD_IMAGE', value: true})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListFoldersComponent);
