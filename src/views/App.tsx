import * as React from 'react';
import {Provider} from "react-redux";

import { PersistGate } from 'redux-persist/integration/react';

import {store, persistor} from "../redux";
import ListFoldersComponent from "./list-folders/list-folders.component";
import ImageViewComponent from "./image-view/image-view.component";

import './App.scss'
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <h1>Gallery tree view</h1>
                    <ListFoldersComponent/>
                    <ImageViewComponent/>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
