import React, {Component} from 'react';
import VisualizationFoldersComponent from "../../commons/folders/visualization-folders/visualization-folders.component";

class ListFoldersComponent extends Component {
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

export default ListFoldersComponent;
