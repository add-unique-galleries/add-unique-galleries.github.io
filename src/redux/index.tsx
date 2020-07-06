import {combineReducers, createStore} from "redux";
import imageViewRedux from "./reducers/image-view.reducer";
import documentRedux from "./reducers/document.reducer";

const store = createStore(combineReducers({imageViewRedux, documentRedux}))

export default store;
