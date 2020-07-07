import {imageViewInitState} from "../states/image-view.state";
import { IMAGE_VIEW_OPEN} from "../actions/types";
import {IPhotos} from "../../models/gallery.interfaces";

const imageViewRedux = (initState = imageViewInitState, actions: {value: {src: IPhotos}, type: string}) => {

  switch (actions.type) {
    case IMAGE_VIEW_OPEN:
      return ({...initState, ...actions.value});
  }

  return initState;
};

export default imageViewRedux;
