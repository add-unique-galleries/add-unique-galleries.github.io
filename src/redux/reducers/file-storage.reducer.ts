import {initializeFileStorage} from "../states/file-storage.state";
import {ADD_FOLDER, ADD_IMAGES, REMOVE_IMAGE, UPDATE_FOLDER} from "../actions/types";


// @ts-ignore
const fileStorageRedux = (initState = initializeFileStorage, actions) => {
    switch (actions.type) {
        case ADD_FOLDER:
            return {...initState};
        case UPDATE_FOLDER:
            return {...initState}
        case ADD_IMAGES:
            return {...initState}
        case REMOVE_IMAGE:
            return {...initState}
    }
    return initState;
};

export default fileStorageRedux;
