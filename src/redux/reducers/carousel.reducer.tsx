import {carouselInitState} from "../states/carousel.state";
import {DEFAULT_CAROUSEL, OPEN_CAROUSEL} from "../actions/types";

const carouselRedux = (initState = carouselInitState, actions: {type: string, value: []}) => {
  switch (actions.type) {
    case OPEN_CAROUSEL:
      return ([...initState, ...actions.value]);
    case DEFAULT_CAROUSEL:
      return initState
  }

  return initState;
};

export default carouselRedux;
