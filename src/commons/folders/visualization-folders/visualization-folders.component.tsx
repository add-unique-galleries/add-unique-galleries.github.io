import React, {Component} from 'react';
// @ts-ignore
import folderIcon from '../../../../public/assets/images/icons8-folder.svg';

import './list-folders.component.scss'

class VisualizationFoldersComponent extends Component {
    render() {
        return (
            <ul className="sitemap">
                <li><a href="#">item 1</a></li>
                <li><a href="#">item 2</a></li>
                <li><a href="#">item 3</a></li>
                <li><a href="#" className="open">item 4</a>
                    <ul>
                        <li><a href="#">sub-item 1</a></li>
                        <li><a href="#">sub-item 2</a></li>
                        <li><a href="#" className="open">sub-item 3</a>
                            <ul>
                                <li><a href="#">sub-sub-item 1</a></li>
                                <li><a href="#">sub-sub-item 2</a></li>
                                <li><a href="#" className="open">sub-sub-item 3</a>
                                    <ul>
                                        <li><a href="#">sub-sub-sub-item 1</a></li>
                                        <li><a href="#">sub-sub-sub-item 2</a></li>
                                        <li><a href="#">sub-sub-sub-item 3</a></li>
                                        <li><a href="#">sub-sub-sub-item 4</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">sub-sub-item 4</a></li>
                            </ul>
                        </li>
                        <li><a href="#">sub-item 4</a></li>
                    </ul>
                </li>
                <li><a href="#">item 5</a></li>
                <li><a href="#">item 6</a></li>
            </ul>
        );
    }
}

export default VisualizationFoldersComponent;
