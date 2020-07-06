import {imageViewInitState} from "../states/image-view.state";

const imageViewRedux = (initState = imageViewInitState, actions: {value: {src: string}, type: string}) => {

  switch (actions.type) {
    case 'IMAGE_VIEW_OPEN':
      return ({...initState, ...actions.value});
  }

  return initState;
};

export default imageViewRedux;
