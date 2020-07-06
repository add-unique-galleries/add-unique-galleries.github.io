import {documentInitState} from "../states/document.state";

const documentRedux = (initState = documentInitState, actions: { type: string, value: {createFolder: boolean, addImage: boolean} }) => {
    switch (actions.type) {
        case 'CREATE_FOLDER':
            return ({...initState, ...actions.value});
        case 'ADD_IMAGE':
            return ({...initState, ...actions.value});

    }

    return initState;
};

export default documentRedux;
