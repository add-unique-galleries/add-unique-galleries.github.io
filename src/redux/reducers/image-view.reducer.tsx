import {imageViewInitState} from "../states/image-view.state";
import { IMAGE_VIEW_OPEN} from "../actions/types";

// @ts-ignore
const imageViewRedux = (initState = imageViewInitState, actions) => {

  switch (actions.type) {
    case IMAGE_VIEW_OPEN:
      return ({...initState, ...actions.value});
  }

  return initState;
};

export default imageViewRedux;
