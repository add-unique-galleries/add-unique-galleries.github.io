import {combineReducers, createStore} from "redux";
import imageViewRedux from "./reducers/image-view.reducer";
import documentRedux from "./reducers/document.reducer";
import carouselRedux from "./reducers/carousel.reducer";

const store = createStore(combineReducers({imageViewRedux, documentRedux, carouselRedux}))

export default store;
