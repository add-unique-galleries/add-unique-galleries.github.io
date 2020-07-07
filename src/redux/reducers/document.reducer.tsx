import {documentInitState} from "../states/document.state";
import {ADD_IMAGE, CREATE_FOLDER} from "../actions/types";

// @ts-ignore
const documentRedux = (initState = documentInitState, actions) => {
    switch (actions.type) {
        case CREATE_FOLDER:
            return ({...initState, ...actions.value});
        case ADD_IMAGE:
            return ({...initState, ...actions.value});

    }

    return initState;
};

export default documentRedux;
