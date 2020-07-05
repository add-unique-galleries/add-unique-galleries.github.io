import * as React from 'react';
import {Provider} from "react-redux";

import store from "../redux";

import GalleryComponent from "../commons/gallery-componnets/gallery.component";
import RightButtonMenuComponent from "../commons/button-menu/right-button-menu.component";
import ListFoldersComponent from "./list-folders/list-folders.component";

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ListFoldersComponent />
            </Provider>
        );
    }
}

export default App;
