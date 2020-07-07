import {carouselInitState} from "../states/carousel.state";
import {OPEN_CAROUSEL} from "../actions/types";

const carouselRedux = (initState = carouselInitState, actions: {type: string, value: []}) => {
  switch (actions.type) {
    case OPEN_CAROUSEL:
      return initState = actions.value;
  }

  return initState;
};

export default carouselRedux;
