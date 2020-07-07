import {carouselInitState} from "../states/carousel.state";
import {OPEN_CAROUSEL} from "../actions/types";

// @ts-ignore
const carouselRedux = (initState = carouselInitState, actions) => {
  switch (actions.type) {
    case OPEN_CAROUSEL:
      return initState = actions.value;
  }

  return initState;
};

export default carouselRedux;
