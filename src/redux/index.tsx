import {combineReducers, createStore} from "redux";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import imageViewRedux from "./reducers/image-view.reducer";
import documentRedux from "./reducers/document.reducer";
import carouselRedux from "./reducers/carousel.reducer";
import fileStorageRedux from "./reducers/file-storage.reducer";

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducers = combineReducers({
    fileStorageRedux,
    imageViewRedux,
    documentRedux,
    carouselRedux
})

const persistReducers = persistReducer(persistConfig, rootReducers)
const store = createStore(persistReducers)
const persistor = persistStore(store)
export { store, persistor }
