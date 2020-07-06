import {combineReducers, createStore} from "redux";
import imageViewRedux from "./reducers/image-view.reducer";

const store = createStore(combineReducers({imageViewRedux}))

export default store;
